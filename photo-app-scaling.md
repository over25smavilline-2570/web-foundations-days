# SnapShare System Design: Scaling Plan

## 1. Assumptions & Daily Active Users (DAU)
- **Total Registered Users:** 10,000,000 users
- **Activity Rate:** 10% of registered users active each day
- **Daily Active Users (DAU):** 10,000,000 × 10% = **1,000,000 DAU**
- **User Actions:** Each active user uploads 1 photo per day and views 50 feed pages per day (assume 20 photos per feed page).
- **File Sizes:** Average original photo is 2 MB; each photo also generates a 50 KB thumbnail.

---

## 2. Traffic and Storage Calculations

### A. Uploads Per Second (Writes)
- **Total Daily Uploads:** 1,000,000 DAU × 1 upload/day = 1,000,000 uploads/day
- **Average Uploads/sec:** 1,000,000 / 86,400 seconds ≈ **11.57 writes/sec**
- **Peak Uploads/sec (using 5× peak multiplier):** 11.57 × 5 ≈ **57.87 writes/sec** (~58 writes/sec)

### B. Feed Views Per Second (Reads)
- **Total Daily Feed Views:** 1,000,000 DAU × 50 feed pages/day = 50,000,000 feed views/day
- **Average Feed Views/sec:** 50,000,000 / 86,400 seconds ≈ **578.7 read queries/sec** (~579 reads/sec)
- **Peak Feed Views/sec (using 5× peak multiplier):** 578.7 × 5 ≈ **2,893.5 read queries/sec** (~2,894 reads/sec)
- *(Note on raw photo requests: At 20 photos per feed page, peak thumbnail/image requests can reach up to ~57,870 requests/sec, which is safely absorbed by the CDN and cache layers).*

### C. Photo Storage Per Year
- **Original Photos Storage / Day:** 1,000,000 uploads × 2 MB = 2,000,000 MB = **2 TB/day**
- **Thumbnails Storage / Day:** 1,000,000 uploads × 50 KB = 50,000 MB = **50 GB/day**
- **Total Combined Storage / Day:** 2.05 TB/day
- **Total Storage Per Year:** 2.05 TB/day × 365 days = **748.25 TB/year** (Raw media storage, excluding DB metadata indexes).

---

## 3. Workload Profile: Read-Heavy vs. Write-Heavy
- **System Profile:** The system is **heavily read-heavy** (roughly a 50:1 read-to-write ratio based on user activity). 
- **Design Implications:** Because users read vastly more than they write, the design must prioritize heavy caching layers (Redis), global edge caching (CDN), and database read replicas to scale out read queries and shield the primary database from traffic spikes.

---

## 4. Why Photos Should Not Be Stored Inside the Database
Binary files like 2 MB JPEGs should never be stored directly inside a relational database because databases are optimized for structured text metadata, indexing, and transactional integrity (ACID). Storing large blobs inside a database would bloat database size, slow down backups, exhaust memory caches, and severely degrade query performance. Instead, photos must be stored in **distributed Object Storage (e.g., AWS S3)**, while the database only holds lightweight text pointers (URLs/file keys) to where the binary files live.

---

## 5. Architecture Diagram

```text
       [ Clients (Mobile / Web App) ]
                     │
                     ▼
      [ Content Delivery Network (CDN) ] ── (Edge Caching for Images & Thumbnails)
                     │
                     ▼
         [ Load Balancer (Nginx / ALB) ]
                     │
           ┌─────────┴─────────┐
           ▼                   ▼
    [ App Server 1 ]    [ App Server 2 ]  ... (Stateless API Tier)
           │                   │
           ├───────────────────┼──────────────────┐
           ▼                   ▼                  ▼
     [ Redis Cache ]    [ Primary DB ]    [ Message Queue (SQS / RabbitMQ) ]
                               │                          │
                               ▼                          ▼
                    [ Read Replica DB ]          [ Thumbnail Worker Node ]
                               │                          │
                               └──────────┬───────────────┘
                                          ▼
                           [ Object Storage (AWS S3) ]
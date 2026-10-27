# School Database Design
 
## Tables
 
- **students** - one row per student: id, name and a unique email.
- **courses** - one row per course: id, title and teacher.
- **enrolments** - one row per student per course, with the grade.
  Its primary key is the pair (student_id, course_id), so a student
  cannot be enrolled on the same course twice.
 
## Relationships
 
- Students and courses are **many-to-many**: a student takes many
  courses and a course has many students.
- A relational table cannot store a list of courses in one column,
  so the **enrolments join table** stores one row per pairing.
- This creates two **one-to-many** relationships: one student has
  many enrolments, and one course has many enrolments.
 
## Index
 
    CREATE INDEX idx_enrolments_course ON enrolments(course_id);
 
The primary key already makes lookups by student fast (student_id
comes first). Teachers will often ask "who is on my course?", which
searches by course_id, so a separate index on course_id speeds up
that query.
 
## SQL or NoSQL?
 
SQL is the better choice. The data is highly structured and the
relationships matter: every enrolment must point to a real student
and a real course, a student must not enrol twice, and grades must
not be lost. A relational database enforces all of these rules with
keys and constraints, and JOINs answer questions like "all students
on this course" easily.
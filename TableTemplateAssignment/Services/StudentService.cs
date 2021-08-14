using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using TableTemplateAssignment.Database;
using TableTemplateAssignment.Models;

namespace TableTemplateAssignment.Services
{
    public class StudentService
    {
        private SchoolManagementEntities schoolManagementEntities = new SchoolManagementEntities();
        public List<StudentsMapper> GetStudents()
        {
            List<StudentsMapper> studentsMappers = new List<StudentsMapper>();
            try
            {
                List<Student> databaseObjects = schoolManagementEntities.Students.ToList();
                studentsMappers = databaseObjects.Select(x => new StudentsMapper()
                {
                    Id = x.Id,
                    Address = x.Address,
                    Age = x.Age,
                    DOB = x.DateOfBirth.ToString(),
                    Fees = x.Fees,
                    Name = x.Name

                }).ToList();
                return studentsMappers;
            }
            catch (Exception ex)
            {

                throw;
            }
        }
    
        public void saveStudentRecord(StudentsMapper studentsMapper)
        {
            
            try
            {
                Student student;
                student = studentsMapper.Id == 0 ? new Student() : schoolManagementEntities.Students.FirstOrDefault(x => x.Id == studentsMapper.Id);
                student.Name = studentsMapper.Name;
                student.Address = studentsMapper.Address;
                student.Age = studentsMapper.Age;
                student.Fees = studentsMapper.Fees;
                student.DateOfBirth = DateTime.ParseExact(studentsMapper.DOB, "dd-MM-yyyy", CultureInfo.InvariantCulture);
                schoolManagementEntities.SaveChanges();
            }
            catch (Exception ex)
            {

                throw;
            }
            
        }
    }
}
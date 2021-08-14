using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TableTemplateAssignment.Database;
using TableTemplateAssignment.Models;
using TableTemplateAssignment.Services;

namespace TableTemplateAssignment.Controllers
{
    public class DashboardController : Controller
    {
        private StudentService studentService = new StudentService();
        // GET: Student
        public ActionResult Index()
        {
            try
            {
                var data = studentService.GetStudents();
                return View("Dashboard",data);
            }
            catch (Exception ex)
            {
                return View("Error");
            }
           
        }

        public ActionResult GetStudentsGrid()
        {
            try
            {
                var data = studentService.GetStudents();
                return PartialView("_StudentsGrid", data);
            }
            catch (Exception ex)
            {

                return View("Error");
            }
            
        }
    
        [HttpPost]
        public JsonResult SaveStudent(StudentsMapper student)
        {
            try
            {
                studentService.saveStudentRecord(student);
               
                return Json(new { message = "Student Details are updated", success = true });
            }
            catch (Exception ex)
            {
                return Json(new { message = ex.Message, success = false });
            }
            
        }
    }


}
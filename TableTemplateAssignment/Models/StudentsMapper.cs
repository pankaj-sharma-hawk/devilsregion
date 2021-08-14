
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TableTemplateAssignment.Models
{
    public class StudentsMapper
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string DOB { get; set; }

        public decimal Fees { get; set; }

        public string Address { get; set; }

        public int Age { get; set; }
    }
}
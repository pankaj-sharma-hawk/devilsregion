$(document).ready(function () {
    console.log("student collection", studentCollection);
    var studentForm = $("#studentsForm");
    $('#datetimepicker').datetimepicker({
        format: 'DD-MM-yyyy'
    });

    $(".editRecord").click(function () {
        var currentObject = [];
        var id = parseInt($(this).data('id'))
        console.log("id", id);
        currentObject = $.grep(JSON.parse(studentCollection), function (v) {
            console.log("id",v.Id)
            return v.Id == id;
        })[0];
        console.log(currentObject);
        if (currentObject) {
            //fill data in popup elements
            $("#recordId").val(currentObject.Id);
            $("#name").val(currentObject.Name);
            $("#dob").val(currentObject.DOB);
            $("#fee").val(currentObject.Fees);
            $("#address").val(currentObject.Address);
            $("#age").val(currentObject.Age);
        }
    });

    $("#saveStudents").click(function () {
        if (validateStudentsForm()) {
            var studentFormDataObject = {
                Name:studentForm.find('#name').val(),
                DOB: studentForm.find('#dob').val(),
                Fees: studentForm.find('#fee').val(),
                Address: studentForm.find('#address').val(),
                Age: studentForm.find('#age').val(),

            }

            $.ajax({
                type: 'POST',
                url: "/Dashboard/SaveStudent",
                data: studentFormDataObject,
                dataType: "json",
                success: function (e) {
                    if (e.success) {
                        alert(e.message);
                        $('#studentModel').modal('hide');
                        refreshGrid();

                    } else {
                        alert("Error"+e.message);
                    }
                }
            });
        }
        else {
            return false;
        }
    });

    
        
    
    function refreshGrid() {

        $.ajax({
            type: 'GET',
            url: "/Dashboard/GetStudentsGrid",
            success: function (updatedHtml) {
                if (updatedHtml) {
                    $("#student-table-grid").html('');
                    $("#student-table-grid").html(updatedHtml);

                } else {
                    alert("Error");
                }
            }
        });
    }



    $(".modal").on("hidden.bs.modal", function () {
        studentForm.trigger('reset');
    });

    function validateStudentsForm() {
        var isValidate = true;
        if ($("#name").val().trim() == '' || $("#name").val().trim() == null) {
            $("#name").next('span.validationSpan').removeClass('hide');
            isValidate = false;
        }
        else {
            $("#name").next('span.validationSpan').addClass('hide');
        }

        if ($("#dob").val().trim() == '' || $("#dob").val().trim() == null) {
            $("#dob").next('span.validationSpan').removeClass('hide');
            isValidate = false;
        }
        else {
            $("#dob").next('span.validationSpan').addClass('hide');
        }


        if ($("#fee").val().trim() == '' || $("#fee").val().trim() == null) {
            $("#fee").next('span.validationSpan').removeClass('hide');
            isValidate = false;
        }
        else {
            $("#fee").next('span.validationSpan').addClass('hide');
        }

        if ($("#address").val().trim() == '' || $("#address").val().trim() == null) {
            $("#address").next('span.validationSpan').removeClass('hide');
            isValidate = false;
        }
        else {
            $("#address").next('span.validationSpan').addClass('hide');
        }

        if ($("#age").val().trim() == '' || $("#age").val().trim() == null) {
            $("#age").next('span.validationSpan').removeClass('hide');
            isValidate = false;
        }
        else {
            $("#age").next('span.validationSpan').addClass('hide');
        }

        return isValidate;
    }


    
});
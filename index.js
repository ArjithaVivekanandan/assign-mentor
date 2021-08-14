require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());


const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Your app is running with ${port}`));

let students = [];
let sid = 0, mid = 0;
let mentors = [];


app.get("/", function (req, res) {
    res.json({
        output: students,mentors
    });

});




app.post("/createMentor", function (req, res) {
    let mentor = {};
    mentor.id = mid + 1;
    if (req.body.name) { mentor.name = req.body.name } else { res.status(400).json({ output: 'Please specify Name of the Mentor' }) };
    mentor.studs = [];
    mentors.push(mentor);
    mid++;
    res.status(200).json({ output: 'Mentor Created Successfully' })
});

app.post("/createStudent", function (req, res) {
    let student = {};
    student.id = sid + 1;
    student.status = false;
    student.mName="";
    if (req.body.name) { student.name = req.body.name } else { res.status(400).json({ output: 'Please specify Name of the Student' }) };
    students.push(student);
    sid++;
    res.status(200).json({ output: 'Student Created Successfully' })
});




app.put("/assignStudenttoMentor", function (req, res) {
    let Sid = req.body.sid;
    let Mid = req.body.mid;
    console.log()
    if (students[Sid-1] !=null && students[Sid-1].status===false) {
        if (mentors[Mid-1]!=null) {
            mentors[Mid-1].studs.push(students[Sid-1].name);
            students[Sid-1].status=true;
            students[Sid-1].mName=mentors[Mid-1].name;
            res.status(200).json({ output: 'Student Assigned to Mentor Successfully' })
        }
        else {
            res.status(400).json({ output: 'Please specify valid mentor id' });

        }
    }
    else {
        res.status(400).json({ output: 'Please specify valid student id' });

    }
});

app.put("/UpdateMentor",function(req,res){
    let Sid = req.body.sid;
    let Mid = req.body.mid;
    if (students[Sid-1] !=null )
    {
        if (mentors[Mid-1]!=null) 
            {
                if( students[Sid-1].status===false)
                {
                    mentors[Mid-1].studs.push(students[Sid-1].name);
                    students[Sid-1].status=true;
                    students[Sid-1].mName=mentors[Mid-1].name;
                     res.status(200).json({ output: 'Created Mentor for Student Successfully' })
                }
           
            
             else
                {
                  let oldM=  students[Sid-1].mName;

                    console.log(students[Sid-1].mName)
                    let indexName=mentors.findIndex(ele=> ele.name===oldM);
                    console.log(indexName)
                    for(i=0;i<mentors[indexName].studs.length;i++){
                            if(students[Sid-1].name==mentors[indexName].studs[i])
                            {
                            mentors[indexName].studs.splice(i);
                            mentors[Mid-1].studs.push(students[Sid-1].name)
                            students[Sid-1].mName=mentors[Mid-1].name;
                            break;
                            }
                    }
                    
                    res.status(200).json({ output: 'Updated Mentor of the student Successfully' })


                }
             }
         else 
            {
                 res.status(400).json({ output: 'Please specify valid mentor id' });

             }
    }
    else {
        res.status(400).json({ output: 'Please specify valid student id' });

    }

})
app.get("/:Id", function (req, res) {
    if(mentors[req.params.Id-1]!=null)
    {
    res.json({
        output: mentors[req.params.Id-1].studs
    });
    }
    else{
        res.json({
            output: "No mentor defined with this Id or No student available for this mentor"
        });

    }
});
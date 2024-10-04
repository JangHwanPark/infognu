import './subject.css';
import Navigation from "@/components/Navigation";
import TimeTableRow from "@/components/TimeTableRow";
import EnrollmentSubjects from "@/components/EnrollmentSubjects";
import SubjectsInformation from "@/components/SubjectsInformation";
import ModalTimeTableSave from "@/components/ModalTimeTableSave";

export default function SubjectManagement() {
    const someBaseData =
        {
            "depts": [
                {
                    "deptCode": "CSE",
                    "deptName": "Computer Science",
                    "grade": [
                        {
                            "year": 1,
                            "classes": ["A", "B"]
                        },
                        {
                            "year": 2,
                            "classes": ["A", "B", "C"]
                        }
                    ]
                },
                {
                    "deptCode": "EEE",
                    "deptName": "Electrical Engineering",
                    "grade": [
                        {
                            "year": 1,
                            "classes": ["A"]
                        },
                        {
                            "year": 3,
                            "classes": ["A", "B"]
                        }
                    ]
                }
            ],
            "timeMeta": {
                "maxTime": 9
            },
            "rooms": ["강의실1", "강의실2", "강의실3"]
        }
    ;

    return (
        <div id="container">
            <Navigation/>
            <header>
                <h1>과목정보관리</h1>
                <h2>과목정보</h2>
                <SubjectsInformation/>
            </header>

            <EnrollmentSubjects/>
            <TimeTableRow baseData={someBaseData} time={0}/>

            <footer>
                <ModalTimeTableSave/>
                <p>© 2021. All rights reserved.</p>
            </footer>
        </div>
    );
}

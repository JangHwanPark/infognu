import './subject.css';
import TimeTableRow from "@/components/TimeTableRow";
import EnrollmentSubjects from "@/components/EnrollmentSubjects";
import SubjectsInformation from "@/components/SubjectsInformation";
import ModalTimeTableSave from "@/components/ModalTimeTableSave";

export default async function SubjectManagement() {
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

    const baseUrl = typeof window === 'undefined'
        ? 'http://localhost:3000'  // 서버 측에서는 절대 경로 필요
        : '';  // 클라이언트 측에서는 상대 경로 사용
    const res = await fetch(`${baseUrl}/api/example`);  // 상대 경로 사용
    const result = await res.json();
    console.log(`데이터 ${result.data}`)

    return (
        <div id="container">
            <header>
                <h1>과목정보관리</h1>
                <h2>과목정보</h2>
                <SubjectsInformation/>
            </header>

            <EnrollmentSubjects/>
            <TimeTableRow baseData={someBaseData} time={0}/>

            <footer className="my-10">
                <ModalTimeTableSave/>
                <p>© 2021. All rights reserved.</p>
            </footer>
        </div>
    );
}

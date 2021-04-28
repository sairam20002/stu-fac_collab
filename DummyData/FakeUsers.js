//Have it modified such that you have Random[x...y] students and Random [a...b] in each department in Each college
//Number of colleges- 5
// Number of Departments- 5
// Number of Courses - 2
//Total Batches of Students- 3 (2018, 2019, 2020)
//30<x,y<50
//25<a,b<30
//Max Student Data= 7500 Students, Min 4500
//Max Faculties = 1500 Faculties, Min 1250
const faker = require('faker')
const axios = require('axios')
const colors = require('colors')
const collegeId = ['IIIT G', 'IIIT H', 'NIT A', 'IIT B', 'BITS Goa']
const department = ['Mechanical Engineering', 'Computer Science Engineering', 'Electronics and Communication Engineering', 'Electrical Engineering', 'Civil Engineering']
const Type = ['Student', 'Faculty']
const course = ['B.Tech', 'M.Tech']
const gender = ['male', 'female']
function getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}
const makeFakeUser = (i, type, collegeId, department, enrollDate, allotedCourse) => {
    const User = {}
    const studGender = gender[Math.floor(Math.random() * gender.length)]
    const firstName = faker.name.firstName(studGender);
    User['username'] = `test${i}`
    User['password'] = 'akshay'
    User['name'] = firstName
    User['gender'] = studGender
    User['collegeId'] = collegeId
    User['email'] = `testemail${i}@gmail.com`
    User['department'] = department
    User['enrolledDate'] = enrollDate
    User['Type'] = type
    if (type === 'Student') {
        const studCourse = allotedCourse
        User['rollNumber'] = Math.random().toString(16).substr(2, 8);
        User['course'] = studCourse
        if (studCourse === 'B.Tech') {
            User['batch'] = enrollDate.getFullYear() + 4
            User['courseDuration'] = 4
        } else if (studCourse === 'M.Tech') {
            User['batch'] = enrollDate.getFullYear() + 2
            User['courseDuration'] = 2
        }
    } else if (type === 'Faculty') {
        User['registrationNumber'] = Math.random().toString(16).substr(2, 8);
    }

    return User;
}
const exec = async () => {
    let seed = 0;
    for (let i = 0; i < collegeId.length; i++) {
        for (let j = 0; j < department.length; j++) {
            const facultyCount = Math.floor(Math.random() * 5 + 25)
            //Adding Faculties in each department
            for (f = 0; f < facultyCount; f++) {
                console.log(seed)
                const obj = makeFakeUser(seed, 'Faculty', collegeId[i], department[j], new Date(2000, 0, 10), course[0])
                console.log(colors.yellow('Request for faculty Sent'))
                try {
                    const res = await axios.post("http://localhost:3000/api/user/", obj)
                    console.log(colors.green(`Faculty added Sucessfully Seed ${seed}`))
                }
                catch (err) {
                    console.log(colors.red(`Something went wrong status code ${err.response.status} for seed ${seed}`))
                }
                seed++;
            }
            //Adding Students from both the courses
            for (let k = 0; k < 2; k++) {
                for (year = 2018; year < 2021; year++) {
                    const d1 = new Date(year, 0, 1)
                    const studentCount = Math.floor(Math.random() * 20 + 30)
                    for (s = 0; s < studentCount; s++) {
                        console.log(seed)
                        const obj = makeFakeUser(seed, 'Student', collegeId[i], department[j], d1, course[k])
                        console.log(colors.yellow('Request for student Sent'))
                        try {
                            const res = await axios.post("http://localhost:3000/api/user/", obj)
                            console.log(colors.green(`Student added Sucessfully Seed ${seed}`))
                        }
                        catch (err) {
                            console.log(colors.red(`Something went wrong status code ${err.response.status} for seed ${seed}`))
                        }
                        seed++;
                    }
                }
            }
        }
    }
}



exec()

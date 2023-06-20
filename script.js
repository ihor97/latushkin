// в обєкта є властивість конструтор яка вказує на функцію коснтруктор

function Student(name,course,marks) {
    this.name=name
    this.course=course
    this.marks=Array.isArray(marks)? marks:[]
}

Student.prototype.getAverageMark=function(){
    return this.marks.reduce((s,v)=>s+v,0)/this.marks.length
}
// ще добавили гетер щоб просто була властивість 
Object.defineProperty(Student.prototype,'averageMark',
{
    get(){
        return this.getAverageMark()
    }
})

const student=new Student('Alex',3,[3,4,2,5,1,5,2])
console.log(student);
console.log(student.averageMark);


function Faculty(name) {
    this.name=name
    this.students=[]
}

Faculty.prototype.addStudent=function (student) {
    this.students.push(student)
}
Faculty.prototype.getAverageMark=function () {
    return this.students.reduce((sum,student)=>sum+student.averageMark,0)/this.students.length
}
const faculty=new Faculty('web')
faculty.addStudent(new Student('alex',5,[3,4,5,1,5,3,5]))
faculty.addStudent(new Student('ivan',3,[2,42,2,4,15]))
faculty.addStudent(new Student('maria',5,[3,4,5,1,5,3,5]))
faculty.addStudent(new Student('marta',1,[3,4,5,1,323,3,5]))
faculty.addStudent(new Student('oleg',5,[3,4,5,1,5,3,5]))

console.log(faculty.getAverageMark());
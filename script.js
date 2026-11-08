
// 1. إنشاء كلاس الطالب Student

class Student {

    constructor(id, name, grades, attendance) {
        this.id = id;
        this.name = name;
        this.grades = grades;
        this.attendance = attendance;
    }

    // حساب متوسط درجات الطالب
    calculateAverage() {

        const total = this.grades.reduce(function(sum, grade) {
            return sum + grade;
        }, 0);

        return total / this.grades.length;
    }

    // تحديد التقدير بالحروف
    getGrade(average) {

        if (average >= 90) {
            return "A";
        } else if (average >= 80) {
            return "B";
        } else if (average >= 70) {
            return "C";
        } else if (average >= 60) {
            return "D";
        } else if (average >= 50) {
            return "E";
        } else {
            return "F";
        }
    }

    // تحديد النتيجة النهائية
    getFinalResult() {

        const average = this.calculateAverage();

        if (average >= 50 && this.attendance >= 75) {
            return "ناجح";
        } else {
            return "يحتاج مراجعة";
        }
    }
}

// 2. إنشاء مصفوفة الطلاب

const studentsList = [

    new Student(101, "أحمد", [90, 85, 95], 90),

    new Student(102, "محمد", [45, 40, 45], 80),

    new Student(103, "سارة", [70, 75, 80], 95),

    new Student(104, "منى", [48, 42, 45], 70)

];

// 3. لجنة الرأفة

// استخراج الطلاب الذين متوسطهم من 40 إلى 49
const studentsInMercy = studentsList.filter(function(student) {

    const average = student.calculateAverage();

    return average >= 40 && average <= 49;

});


// إضافة 5 درجات إلى متوسط كل طالب متعثر
const mercyResults = studentsInMercy.map(function(student) {

    const oldAverage = student.calculateAverage();

    const newAverage = oldAverage + 5;

    return {
        id: student.id,
        name: student.name,
        oldAverage: oldAverage,
        newAverage: newAverage
    };

});


// جمع المتوسطات الجديدة باستخدام reduce
const totalNewAverages = mercyResults.reduce(function(sum, student) {

    return sum + student.newAverage;

}, 0);


// حساب المتوسط العام بعد الرأفة
// حماية من القسمة على صفر
const mercyAverage = mercyResults.length > 0
    ? totalNewAverages / mercyResults.length
    : 0;



// 4. طباعة تقرير كل طالب


console.log("===== تقرير نتائج الطلاب =====");

studentsList.forEach(function(student) {

    const average = student.calculateAverage();

    const grade = student.getGrade(average);

    const result = student.getFinalResult();

    console.log("------------------------");

    console.log("رقم الجلوس:", student.id);

    console.log("اسم الطالب:", student.name);

    console.log("المتوسط:", average.toFixed(2));

    console.log("التقدير:", grade);

    console.log("النتيجة:", result);

});



// 5. طباعة نتائج لجنة الرأفة


console.log("===== لجنة الرأفة =====");

console.log("الطلاب الذين شملتهم الرأفة:");

console.table(mercyResults);



// 6. طباعة متوسط الرأفة


console.log("===== متوسط الطلاب بعد الرأفة =====");

if (mercyResults.length > 0) {

    console.log("عدد الطلاب المتعثرين:", mercyResults.length);

    console.log("متوسطهم بعد الرأفة:", mercyAverage.toFixed(2));

} else {

    console.log("لا يوجد طلاب متعثرون.");

}

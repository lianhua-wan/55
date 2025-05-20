document.addEventListener('DOMContentLoaded', function() {
    // 模拟学生数据 (实际使用时可以替换为真实数据)
    const students = [
        '张三', '李四', '王五', '赵六', '钱七', 
        '孙八', '周九', '吴十', '郑十一', '王十二',
        '刘十三', '陈十四', '杨十五', '黄十六', '赵十七'
    ];
    
    const studentList = document.getElementById('studentList');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const selectedStudent = document.getElementById('selectedStudent');
    
    let timer = null;
    let isSelecting = false;
    let currentHighlightIndex = -1;
    
    // 初始化学生列表
    function initStudentList() {
        studentList.innerHTML = '';
        students.forEach(student => {
            const studentElement = document.createElement('div');
            studentElement.className = 'student';
            studentElement.textContent = student;
            studentList.appendChild(studentElement);
        });
    }
    
    // 随机选择学生
    function randomSelect() {
        // 移除之前的高亮
        if (currentHighlightIndex >= 0) {
            studentList.children[currentHighlightIndex].classList.remove('highlight');
        }
        
        // 随机选择一个学生
        currentHighlightIndex = Math.floor(Math.random() * students.length);
        studentList.children[currentHighlightIndex].classList.add('highlight');
    }
    
    // 开始选择
    function startSelection() {
        if (isSelecting) return;
        
        isSelecting = true;
        startBtn.disabled = true;
        stopBtn.disabled = false;
        selectedStudent.textContent = '选择中...';
        
        // 每100毫秒切换一次高亮
        timer = setInterval(randomSelect, 100);
    }
    
    // 停止选择
    function stopSelection() {
        if (!isSelecting) return;
        
        clearInterval(timer);
        isSelecting = false;
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        // 显示选中的学生
        const selected = students[currentHighlightIndex];
        selectedStudent.textContent = selected;
        
        // 保持高亮
        studentList.children[currentHighlightIndex].classList.add('highlight');
    }
    
    // 事件监听
    startBtn.addEventListener('click', startSelection);
    stopBtn.addEventListener('click', stopSelection);
    
    // 初始化
    initStudentList();
});
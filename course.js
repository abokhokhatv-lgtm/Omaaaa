// course.js
// يتأكد من أن المستخدم مسجل الدخول وأن صلاحية اشتراكه سارية، وإلا يعيد التوجيه.
document.addEventListener('DOMContentLoaded', () => {
  const logged = JSON.parse(sessionStorage.getItem('loggedInUser') || 'null');
  if (!logged) {
    window.location.href = 'login.html';
    return;
  }
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((u) => u.username === logged.username);
  if (!currentUser) {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
    return;
  }
  // إذا كان المستخدم ليس إدمن، تحقق من تاريخ الانتهاء
  if (currentUser.role !== 'admin' && currentUser.expiry) {
    const expiryDate = new Date(currentUser.expiry);
    const now = new Date();
    if (expiryDate < now) {
      alert('انتهت صلاحية اشتراكك. يرجى التواصل مع الإدارة.');
      sessionStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
      return;
    }
  }
  // زر تسجيل الخروج
  const logoutBtn = document.getElementById('logout-course');
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'login.html';
  });
});
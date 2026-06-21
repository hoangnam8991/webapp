import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const btn = document.getElementById("saveBtn");

btn.addEventListener("click", async () => {

    const service = document.getElementById("service").value;
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message");

    if (!db) {
        message.innerHTML = "❌ Firebase chưa khởi tạo. Vui lòng kiểm tra firebase.js và mở trang qua localhost.";
        return;
    }

    if (service == "") {
        alert("Vui lòng chọn dịch vụ");
        return;
    }

    if (phone == "") {
        alert("Vui lòng nhập số điện thoại");
        return;
    }

    try {

        await addDoc(collection(db, "orders"), {

            service: service,
            phone: phone,
            createdAt: serverTimestamp()

        });

        message.innerHTML = "✅ Đã gửi thành công!";

        document.getElementById("phone").value = "";
        document.getElementById("service").selectedIndex = 0;

    } catch (error) {

        console.error("Firebase write failed:", error);

        message.innerHTML = `❌ Lỗi kết nối Firebase: ${error.message || error}`;

    }

});
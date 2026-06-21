import { db } from "./firebase.js";

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";

const btn = document.getElementById("saveBtn");
const serviceInput = document.getElementById("service");
const providerInfo = document.getElementById("providerInfo");

const serviceProviders = {
    "Xe ôm": {
        name: "Trung xe ôm",
        phone: "091xxxxxxx"
    },
    "Làm vườn": {
        name: "Hoa làm vườn",
        phone: "092xxxxxxx"
    },
    "Sửa chữa nhà cửa": {
        name: "An sửa nhà",
        phone: "093xxxxxxx"
    },
    "Sửa điều hòa": {
        name: "Bình điều hòa",
        phone: "094xxxxxxx"
    },
    "Gia sư": {
        name: "Minh gia sư",
        phone: "095xxxxxxx"
    },
    "Sửa xe": {
        name: "Hùng sửa xe",
        phone: "096xxxxxxx"
    }
};

function updateProviderInfo() {
    const service = serviceInput.value;
    const provider = serviceProviders[service];

    if (provider) {
        providerInfo.innerHTML = `<br>Lien he : <strong>${provider.name}</strong><br><br>Điện thoại: <strong>${provider.phone}</strong>`;
    } else {
        providerInfo.innerHTML = "";
    }
}

serviceInput.addEventListener("change", updateProviderInfo);

btn.addEventListener("click", async () => {

    const service = serviceInput.value;
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
        alert("Để lại số diện thoại để nhà cung cấp liên hệ với bạn");
        return;
    }

    try {

        await addDoc(collection(db, "orders"), {

            service: service,
            phone: phone,
            thoiGian: new Date().toISOString()

        });

        message.innerHTML = "✅ Đã gửi yêu cầu thành công!";

        document.getElementById("phone").value = "";
        document.getElementById("service").selectedIndex = 0;
        updateProviderInfo();

    } catch (error) {

        console.error("Firebase write failed:", error);

        message.innerHTML = `❌ Lỗi kết nối Firebase: ${error.message || error}`;

    }

});

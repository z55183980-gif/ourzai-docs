---
id: models
title: Mô hình và khả năng của ZaiDrama
description: Cách ứng dụng sáng tạo ZaiDrama chọn mô hình theo mục đích cho từng lượt tạo, cũng như cách chọn mô hình, điều chỉnh tham số và xử lý sự cố khi tạo nội dung.
sidebar_position: 4
update_docs: engine-b
---

# Mô hình và khả năng của ZaiDrama {#providers}

Trang này giải thích cách chọn mô hình, hiểu khả năng của chúng và xử lý sự cố khi tạo nội dung trong ZaiDrama. Để gọi trực tiếp các mô hình nền tảng từ ứng dụng của riêng bạn, hãy xem [Bắt đầu nhanh với API](../api/quickstart.md).

Bạn không cần chuẩn bị bất kỳ khóa API bên thứ ba nào để sáng tạo trong ZaiDrama. ZaiDrama chọn mô hình **theo mục đích** cho mỗi lần gọi, và bạn chỉ cần đưa ra lựa chọn ở một vài vị trí từ các ứng viên mà nền tảng cung cấp.

## 1. Chọn mô hình theo mục đích {#model-usages}

Mỗi lần gọi mô hình đều thuộc về một mục đích cố định:

| Danh mục | Mục đích | Chức năng |
| --- | --- | --- |
| Văn bản | Tác vụ đơn giản | Tóm tắt văn bản nguồn, phân tích ảnh phong cách, kiểm tra tính nhất quán |
| Văn bản | Tác vụ phức tạp | Kịch bản, lập kế hoạch hàng loạt, viết trên canvas |
| Văn bản | Trợ lý canvas | Zai thay mặt bạn hành động trong canvas sáng tạo |
| Văn bản | Hiểu hình ảnh và âm thanh trên canvas | Zai trên canvas xem hình ảnh, video và âm thanh trong các nút |
| Văn bản | Truy xuất web | Zai trên canvas truy vấn web khi cần thông tin thời gian thực |
| Hình ảnh | Văn bản thành hình ảnh | Ảnh nhân vật, ảnh bối cảnh, ảnh phân cảnh và các lượt tạo hình ảnh khác chỉ từ văn bản |
| Hình ảnh | Hình ảnh thành hình ảnh | Tạo hình ảnh với ảnh tham chiếu và chỉnh sửa hình ảnh |
| Video | Hình ảnh thành video | Video được điều khiển bởi khung hình đầu tiên của phân cảnh và bố cục lưới |
| Video | Tham chiếu thành video | Tạo video trực tiếp từ ảnh tham chiếu nhân vật, bối cảnh, đạo cụ hoặc sản phẩm |
| Âm thanh | Tường thuật | Lồng tiếng tường thuật và xem trước giọng nhân vật |

Khi bạn dùng lựa chọn mặc định, nền tảng sẽ chọn mô hình hiện có sẵn cho mục đích tương ứng.

## 2. Nơi bạn có thể chọn mô hình {#user-model-selection}

| Vị trí | Những gì bạn có thể chọn |
| --- | --- |
| Thông tin dự án → Tham số tập → Chế độ tự động | Không chọn mô hình; chỉ chọn "Chất lượng video" (Nhanh / Tiêu chuẩn / Chất lượng cao) và tỷ lệ khung hình. Nền tảng chọn mô hình theo mức chất lượng |
| Thông tin dự án → Tham số tập → Chế độ chuyên nghiệp | Chọn mô hình và độ phân giải riêng cho hình ảnh thành video, tham chiếu thành video, văn bản thành hình ảnh và hình ảnh thành hình ảnh; mặc định là "Tuân theo định tuyến toàn cục" |
| Cài đặt dự án → Lồng tiếng tường thuật | Mô hình tường thuật mặc định, giọng tường thuật và tốc độ nói |
| Canvas sáng tạo → Bảng tạo nút | Mô hình được dùng cho lượt tạo này |

- Menu thả xuống hiển thị các mô hình hiện có sẵn cho mục đích đó.
- Khi một mô hình được chỉ định trong dự án tạm thời không khả dụng, giao diện hiển thị "Mô hình được chỉ định trong dự án hiện không khả dụng." Bạn có thể chuyển lại về "Tuân theo định tuyến toàn cục."
- Mô hình hội thoại của Zai và các mục đích văn bản khác do nền tảng cấu hình; người dùng không thể chọn.
- Trang "Cài đặt" cá nhân không có tùy chọn mô hình.

Đối với tác phẩm đầu tiên, bạn nên xác thực phong cách và kết quả bằng một số lượng nhỏ clip trước khi mở rộng phạm vi.

## 3. Ranh giới khả năng {#capability-boundaries}

Nền tảng khai báo khả năng theo từng mô hình cụ thể, thay vì suy luận từ nhà cung cấp nói chung. Sau đây là các danh mục khả năng; mô hình cụ thể hỗ trợ danh mục nào tùy thuộc vào các tùy chọn thực sự có sẵn trong bảng tạo và menu thả xuống:

- **Văn bản**: đầu ra có cấu trúc, hiểu hình ảnh (đầu vào hình ảnh);
- **Hình ảnh**: văn bản thành hình ảnh, hình ảnh thành hình ảnh (tạo và chỉnh sửa với ảnh tham chiếu), độ phân giải và tỷ lệ khung hình được hỗ trợ;
- **Video**: hình ảnh thành video (điều khiển bởi khung hình đầu tiên, một số mô hình hỗ trợ khung hình cuối), tham chiếu thành video (nhiều ảnh tham chiếu, số lượng và loại tùy theo mô hình), âm thanh tham chiếu, thời lượng, độ phân giải và tỷ lệ khung hình được hỗ trợ;
- **Bản âm thanh video**: một số mô hình cho phép bạn chọn có tạo bản âm thanh hay không, một số luôn tạo âm thanh và một số luôn im lặng;
- **Giọng nói**: TTS và giọng nói có thể chọn; tốc độ nói được điều chỉnh trong cài đặt dự án hoặc nút giọng nói trên canvas.

Các yêu cầu vượt quá khả năng đã khai báo của mô hình (ví dụ: truyền khung hình cuối cho một mô hình không hỗ trợ khung hình cuối) sẽ bị từ chối rõ ràng trước khi gửi và không bao giờ bị âm thầm thay thế bằng một mô hình mà bạn không chọn.

## 4. Phí và tín dụng {#credits-and-usage}

Người dùng nên tham khảo số dư khả dụng và chi tiết số dư trong "Thanh toán & Số dư" dưới menu tài khoản. Nền tảng ghi lại mục đích, mô hình, trạng thái và chi phí (bằng USD) của mỗi lượt tạo; mỗi lượt tạo được tính phí theo "đơn giá × mức sử dụng," chính xác đến $0,0001 với mức tối thiểu là $0,0001. Kết quả tính phí được phản ánh trong chi tiết số dư.

Nếu bạn gặp phải tình trạng số dư không đủ hoặc khoản phí bất thường, hãy ghi lại tên dự án và thời điểm xảy ra, sau đó liên hệ bộ phận hỗ trợ trực tuyến qua "Trợ giúp & Phản hồi." Không nhấp tạo liên tục hoặc cố gắng vượt qua kiểm tra tín dụng.

## 5. Xử lý sự cố {#troubleshooting}

### Phía người dùng {#user-troubleshooting}

- **Một mô hình bị thiếu trong menu thả xuống**: mô hình đó không được cung cấp cho mục đích này, hoặc tạm thời không khả dụng;
- **Mô hình được chỉ định trong dự án không khả dụng**: chuyển lại về "Tuân theo định tuyến toàn cục" hoặc chọn một ứng viên khác;
- **Tạo không thành công**: trước tiên hãy đọc lý do thất bại được nêu trên trang hội thoại hoặc trang hàng loạt, và chỉ thử lại các clip bị ảnh hưởng;
- **Xếp hàng quá lâu**: các tác vụ được nền tảng lập lịch đồng nhất; không gửi lại;
- **Số dư không đủ**: kiểm tra số dư và chi tiết trong "Thanh toán & Số dư."

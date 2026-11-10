---
id: canvas
title: "Không gian sáng tạo"
description: "Khung sáng tạo ZaiDrama: tạo nội dung trên các nút, Zai trên khung, xác nhận trước khi tạo, lịch sử phiên bản và chia sẻ."
sidebar_position: 3
update_docs: engine-b
---

# Không gian sáng tạo {#canvas}

Không gian sáng tạo là một khung vẽ vô hạn, nơi bạn có thể tự do sắp xếp ý tưởng, tài liệu tham khảo và kết quả đã tạo. Bạn có thể tạo hình ảnh, video, văn bản và giọng nói trực tiếp trên các nút, đưa một hình ảnh vào nút tiếp theo để xử lý thêm, hoặc nhờ Zai trên khung chỉnh sửa hình ảnh và làm video cho bạn. Khung này rất phù hợp để thử nghiệm phong cách, làm concept art, trau chuốt một cảnh quay đơn lẻ, hoặc làm một video ngắn không cần kịch bản đầy đủ.

## 1. Mối liên hệ giữa khung và dự án {#canvas-and-projects}

- Khung thuộc về cá nhân bạn và không gắn với bất kỳ dự án nào; các dự án cũng không đọc nội dung trên khung.
- Khung không phải là một quy trình sản xuất thứ hai: khung không có kịch bản, không có lô hàng loạt, không có bàn giao bản cắt cuối cùng, và kết quả tạo ra trên khung không tự động đưa vào dự án.
- Hai nơi này kết nối qua **Thư viện Tài nguyên toàn cục**: hình ảnh trên khung có thể được gửi bằng "Lưu vào thư viện tài nguyên", và dự án có thể dùng lại chúng bằng "Từ Thư viện" trên trang Thư viện Tài nguyên của dự án; tab "Tài nguyên" trong thanh bên của khung cũng có thể đặt nội dung từ Thư viện Tài nguyên lên khung.

Hãy dùng dự án khi bạn cần quay một câu chuyện hoàn chỉnh dưới dạng phim ngắn nhiều tập; hãy dùng khung khi bạn muốn thử nghiệm hình ảnh một cách tự do trước, hoặc chỉ làm một vài video độc lập.

## 2. Tạo và quản lý khung {#manage-canvases}

Nhấp vào "Khung sáng tạo" ở thanh bên để mở danh sách khung. Lần đầu bạn vào mà chưa có khung nào, một khung trống sẽ mở trực tiếp.

Danh sách được nhóm thành "Hôm nay / 7 ngày qua / Trước đó", và mỗi thẻ hiển thị nội dung trên khung. Trong danh sách bạn có thể:

- Tìm kiếm tên hoặc nội dung khung từ thanh trên cùng;
- Tạo "Khung mới", hoặc "Nhân bản" một khung hiện có;
- "Nhập" một tệp zip khung, hoặc "Xuất" khung dưới dạng zip (khi gói nhập không được nhận dạng, chỉ phần media của nó được nhập);
- "Chọn" nhiều khung để xuất hoặc xóa hàng loạt;
- Đổi tên và xóa khung.

Khung được đặt tên tự động theo nội dung: lần đầu văn bản xuất hiện trên khung, khung được đặt tên theo nút đầu tiên, và sau khi Zai tạo ra thứ gì đó trên khung, khung được đặt tên theo yêu cầu của lượt đó. Tên bạn đã tự đổi sẽ không bao giờ bị ghi đè. Một khung trống mà bạn đóng lại mà không làm gì sẽ tự động bị loại bỏ và không còn trong danh sách.

Mỗi khung mở trong một tab trình duyệt mới. Khung được lưu tự động và thanh trên cùng hiển thị "Đã lưu / Đang lưu… / Chưa lưu"; nếu cùng một khung được chỉnh sửa ở hai cửa sổ cùng lúc và các chỉnh sửa xung đột, bạn sẽ nhận được cảnh báo "Xung đột với các thay đổi trong cửa sổ khác".

## 3. Nút và kết nối {#nodes}

Thanh công cụ cung cấp:

- **Chọn / Bàn tay**: chọn nút hoặc di chuyển khung;
- **Thêm nút**: Văn bản, Hình ảnh, Video, Âm thanh; nhiều nút có thể được đặt trong một Nhóm;
- **Tải tệp lên**: PNG, JPG, WEBP, MP4, WEBM, MP3, WAV; hình ảnh tối đa 20MB, video tối đa 200MB, âm thanh tối đa 30MB;
- **Dùng tài nguyên có sẵn**: chọn từ tài liệu bạn đã tải lên hoặc tạo ra trước đây;
- **Mẫu cài sẵn**: ví dụ "Người viết kịch bản" và "Xoay chiều nhân vật", giúp bày sẵn một bộ nút thường dùng trong một lần;
- **Cài đặt khung**: tỷ lệ khung hình mặc định, độ phân giải hình ảnh mặc định, kiểu nền, và "Xóa khung".

Kết nối giữa các nút thể hiện mối quan hệ đầu vào: nối một nút hình ảnh vào một nút video, và nó trở thành khung hình đầu tiên hoặc hình tham chiếu của video.

Thanh bên có ba tab: "Khung", "Tài nguyên", và "Lệnh nhắc". "Lệnh nhắc" chứa các bộ sưu tập công khai và thư viện lệnh nhắc "Của tôi" của bạn.

## 4. Tạo nội dung trên nút {#generate}

Chọn một nút để mở bảng tạo nội dung của nút đó:

| Tạo | Cài đặt |
| --- | --- |
| Tạo hình ảnh | Mô hình, độ phân giải, số lượng hình ảnh, tỷ lệ khung hình, phong cách; khi tỷ lệ khung hình đặt là "Tự động", tỷ lệ gần nhất với hình tham chiếu đầu tiên sẽ được dùng |
| Tạo video | Nối một hình ảnh làm khung hình đầu tiên (video thường đi theo hình dạng của nó); nối hai hình trở lên và tất cả đều được đưa vào làm tham chiếu, dùng `@` để nói ai là ai, và video xuất ra theo tỷ lệ khung hình đã chọn; khi bật "Khung đầu & khung cuối", hai hình ảnh đầu tiên là khung bắt đầu và khung kết thúc; độ phân giải, thời lượng, và có tạo âm thanh hay không |
| Viết văn bản | Nội dung cần viết |
| Giọng nói | Giọng, tốc độ |

Khi quá trình tạo hoàn tất, các thao tác nhanh trên nút cho phép bạn tiếp tục với "Tạo video", "Tạo hình ảnh", "Thêm lời dẫn", hoặc "Cảnh tiếp theo".

Các nút hình ảnh cũng cung cấp các công cụ như mô tả thành lệnh nhắc, cắt, tách, nâng cấp độ phân giải, inpaint, góc nhìn mới, lấy khung hình đầu / hiện tại / cuối của video, và lưu vào thư viện tài nguyên. Trong số đó, cắt, tách và nâng cấp chạy trong trình duyệt và miễn phí.

Các mô hình tạo có thể chọn đến từ các ứng viên mà nền tảng đã mở cho từng mục đích; xem [Mô hình và Khả năng](./models.md).

## 5. Zai trên khung {#canvas-zai}

Cửa sổ Zai ở góc dưới bên phải của khung có thể được kéo và đổi kích thước; nhấp đúp vào nó để đưa về góc dưới bên phải. Zai có thể nhìn thấy khung này và cũng có thể chỉnh sửa nó cho bạn:

- **Phạm vi**: khi có nút được chọn, Zai chỉ làm việc trên "N nút đã chọn"; nếu không, Zai làm việc trên "Toàn bộ khung";
- **Xem tài liệu**: Zai có thể xem hình ảnh, video và âm thanh trong các nút;
- **Tìm kiếm web**: Zai tìm kiếm trên web khi cần, và những gì truy xuất được chỉ dùng làm tài liệu tham khảo;
- **Ghi chú**: Zai đọc ghi chú ở đầu bảng vào mỗi lượt, và cả bạn lẫn Zai đều có thể chỉnh sửa nó; các mặc định của khung như tỷ lệ khung hình, phong cách và độ phân giải tự động được mang sang khung mới, nên không cần viết chúng vào ghi chú;
- **Hoàn tác lượt này**: chỉ với một cú nhấp, hoàn tác toàn bộ thay đổi của Zai trên khung trong lượt này.

Zai trên khung không mặc định rằng bạn đang làm phim ngắn; viết truyện, làm áp phích, tạo hình ảnh sản phẩm đều hoạt động. Mô hình trò chuyện mà Zai dùng do nền tảng cấu hình.

### 5.1 Xác nhận trước khi tạo {#approval}

Khi một lượt tạo sẽ tốn phí, theo mặc định Zai trước tiên hiển thị một thanh xác nhận nêu chi phí ước tính (bằng USD) và số dư của bạn, và chỉ chạy sau khi bạn nhấp "Tạo"; nhấp "Xem trên khung" để xem trước những nút mà Zai định thay đổi.

- Trong cài đặt xác nhận của bảng Zai, bạn có thể chuyển sang "Tạo trực tiếp", sau đó Zai không hỏi lại mỗi lần nữa.
- Nếu bạn đánh dấu "Tự xác nhận phần còn lại của lượt này" trên thanh xác nhận, các lượt tạo còn lại trong lượt này sẽ không hiện thẻ từng cái một nữa miễn là nằm trong hạn mức tích lũy $0,20; lượt tạo nào khiến vượt hạn mức thì được xác nhận như thường lệ.
- Các hành động không thể hoàn tác như xóa nút hoặc xóa khung luôn yêu cầu xác nhận.

## 6. Lịch sử {#history}

"Lịch sử" trên thanh trên cùng cho phép bạn xem trước, đặt tên hoặc khôi phục các bản chụp của khung:

- Nền tảng tự động giữ các phiên bản định kỳ trong khi bạn chỉnh sửa; nó cũng giữ một phiên bản trước khi nội dung bị xóa, trước khi một phiên bản được khôi phục, và trước khi Zai sửa đổi khung;
- Các phiên bản bạn tạo bằng "Lưu phiên bản" và đặt tên không bị tự động dọn dẹp;
- Bạn có thể "Khôi phục phiên bản này", hoặc "Lưu thành khung mới".

## 7. Chia sẻ {#share}

"Chia sẻ" trên thanh trên cùng có thể tạo một **Liên kết chỉ đọc**: bất kỳ ai có liên kết đều có thể xem khung này mà không cần đăng nhập, nhưng không thể chỉnh sửa. Bạn có thể "Thu hồi liên kết" bất cứ lúc nào, và liên kết sẽ ngừng hoạt động ngay sau khi bị thu hồi.

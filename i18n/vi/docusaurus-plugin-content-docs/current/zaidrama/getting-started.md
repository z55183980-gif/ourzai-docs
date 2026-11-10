---
id: getting-started
title: Hướng dẫn bắt đầu với ZaiDrama
description: Lộ trình hoàn chỉnh trong ZaiDrama từ một câu duy nhất, đến việc hoàn thiện kế hoạch với Zai, xác nhận sản xuất và nhận video hoàn chỉnh.
sidebar_position: 1
update_docs: engine-a
---

# Hướng dẫn bắt đầu với ZaiDrama {#getting-started}

Hướng dẫn này sẽ đưa bạn qua quá trình tạo bộ phim ngắn đầu tiên trong ZaiDrama (ứng dụng sáng tạo phim ngắn AI, <https://zaidrama.com>): bắt đầu từ một câu duy nhất hoặc một kịch bản, tinh chỉnh yêu cầu thành kế hoạch với Zai, xác nhận báo giá sản xuất và nhận video hoàn chỉnh có thể tải xuống. Bạn chỉ cần mở trang web và đăng nhập—không cần cài đặt phần mềm hay thiết lập API key của bên thứ ba.

## Những gì bạn sẽ đạt được {#what-you-will-build}

Sau khi hoàn thành hướng dẫn này, bạn sẽ có thể:

1. Đăng ký và đăng nhập vào tài khoản nền tảng hợp nhất;
2. Bắt đầu một dự án trên trang chủ chỉ với một câu, một đoạn trích tiểu thuyết hoặc kịch bản, hoặc hình ảnh tham khảo;
3. Phát triển bản tóm tắt sáng tạo, mô hình thế giới và bản thiết kế sản xuất với Zai trong một cuộc trò chuyện duy nhất;
4. Xác nhận báo giá sản xuất và để Zai tiến hành qua các phân cảnh, video và bản cắt cuối cùng theo từng lô;
5. Theo dõi tiến độ trên bảng và các trang lô, và quay lại cục bộ bất kỳ phân đoạn nào bạn chưa hài lòng;
6. Xem trước và tải xuống video hoàn chỉnh cùng gói có thể chỉnh sửa.

## Thời gian và chi phí ước tính {#time-and-cost}

- Việc gửi tin nhắn đầu tiên, tạo dự án và thảo luận kế hoạch không phát sinh phí; chỉ việc tạo hình ảnh, video và âm thanh mới trừ vào số dư của bạn (tính bằng USD).
- Thời gian tạo video phụ thuộc vào số lượng phân đoạn, hàng đợi nền tảng và các mô hình được sử dụng.
- Số dư, số tiền bị đóng băng và chi tiết thanh toán có sẵn trong mục "Billing & Balance" ở menu tài khoản; thẻ xác nhận trước khi sản xuất nêu rõ lần quay này sẽ tốn bao nhiêu.
- Đối với lần thử đầu tiên, chúng tôi khuyên bạn chỉ nên dùng một lượng nội dung nhỏ, hoặc bảo Zai "quay hai phân đoạn đầu trước" để xác nhận phong cách và kết quả trước khi mở rộng phạm vi.

## 1. Đăng ký và đăng nhập {#create-account}

### 1.1 Đăng ký hoặc đăng nhập {#sign-in}

Trên trang đích, nhấp "Start Creating" hoặc "Log In / Sign Up":

- **Đăng nhập**: Nhập email hoặc tên người dùng và mật khẩu vào hộp thoại đăng nhập.
- **Đăng ký**: Trên trang "Create Your ZAI Account", đăng ký bằng mã xác minh email; mật khẩu phải có ít nhất 6 ký tự và bao gồm cả chữ cái lẫn số.
- **Quên mật khẩu**: Nhấp "Forgot password?" trong hộp thoại đăng nhập để đặt lại bằng mã xác minh email.
- **Vào từ nền tảng ZAI**: Trên ourzai.com, nhấp "Creation Workspace" để vào; nếu bạn đã có phiên đăng nhập hợp lệ, bạn sẽ không cần nhập lại mật khẩu.

ZaiDrama và nền tảng ZAI dùng chung một tài khoản, nên tài khoản đã đăng ký trên trang web chính thức hoặc bảng điều khiển nhà phát triển có thể đăng nhập trực tiếp. Nếu phiên đăng nhập hết hạn hoặc cần xác minh bảo mật, hãy làm theo các hướng dẫn trên trang để đăng nhập lại. Để có hướng dẫn đầy đủ về tài khoản và số dư, xem [Tài khoản, Số dư và Hỗ trợ](../platform/account.md).

### 1.2 Menu tài khoản {#account-services}

Menu tài khoản ở góc dưới bên trái của thanh bên cung cấp:

| Mục | Mục đích |
| --- | --- |
| Profile | Ảnh đại diện, biệt danh, liên kết email, đổi mật khẩu, thiết bị đăng nhập, xóa tài khoản |
| Rewards Center | Phần thưởng đăng nhập hằng ngày, phần thưởng giới thiệu |
| Billing & Balance | Số dư khả dụng, chi tiết số dư, lịch sử mua, nạp tiền |
| Storage | Dung lượng đã dùng, mức sử dụng theo từng dự án, dọn dẹp các phiên bản cũ |
| Help & Feedback | Hỗ trợ khách hàng trực tuyến |
| Settings | Giao diện và ngôn ngữ, API token (dành cho các công cụ bên ngoài truy cập ZaiDrama; khác với API key của bảng điều khiển nhà phát triển), giới thiệu, nhật ký chẩn đoán |

Huy hiệu số dư trên thanh trên cùng hiển thị số dư USD hiện tại của bạn; nhấp vào đó để xem chi tiết sử dụng.

## 2. Bắt đầu dự án từ trang chủ {#start-conversation}

### 2.1 Nói những gì bạn muốn làm {#creative-intent}

Tiêu đề trang chủ là "What do you want to turn into a video today?" Hãy viết bất kỳ điểm khởi đầu nào sau đây vào hộp nhập:

- Một ý tưởng câu chuyện hoặc một mục tiêu sáng tạo duy nhất;
- Một đoạn trích tiểu thuyết, kịch bản, dàn ý hoặc giới thiệu sản phẩm;
- Yêu cầu của bạn về phong cách nghệ thuật, thời lượng, tỷ lệ khung hình hoặc đối tượng khán giả.

Các mục khởi đầu nhanh bên dưới hộp nhập có thể giúp bạn bắt đầu: "Upload Novel / Script" mở trực tiếp bộ chọn tệp; "I Have an Idea," "Write an Episode of a Viral Drama Opening," và "Shoot an Ad for a Product" chỉ điền sẵn một lời nhắc một dòng vào hộp nhập mà không gửi thay bạn.

### 2.2 Đính kèm tài liệu {#source-intake}

Thêm tệp đính kèm bằng nút kẹp giấy trên hộp nhập, kéo thả hoặc dán:

- **Hình ảnh**: PNG, JPG, WebP, tối đa 5MB mỗi ảnh, tối đa 5 ảnh mỗi lần. Hình ảnh được hiển thị cho Zai và phù hợp làm tham khảo cho nhân vật, cảnh hoặc sản phẩm.
- **Tệp tiểu thuyết / kịch bản**: `.txt`, `.md`, `.docx`, `.epub`, `.pdf`, tối đa 50MB mỗi tệp, tối đa 5 tệp mỗi lần. Sau khi gửi, chúng được lưu dưới dạng văn bản nguồn của dự án.
- **Văn bản dài được dán**: Việc dán một khối văn bản dài (khoảng 800 ký tự hoặc 16 dòng trở lên) sẽ tự động thu gọn thành thẻ "Pasted Text", thẻ này cũng được lưu dưới dạng văn bản nguồn và tính vào một vị trí tệp; nếu bạn không muốn điều này, hãy nhấp "Convert Back to Body Text Editing."

Một tin nhắn trong hộp nhập có giới hạn 20.000 ký tự; hãy đính kèm nội dung dài hơn dưới dạng tệp. PDF đã quét không có văn bản trích xuất được và phải được OCR trước; hãy chuyển đổi các tệp `.doc` cũ sang `.docx` trước khi tải lên.

### 2.3 Việc gửi tạo ra dự án {#create-project}

Khi bạn gửi tin nhắn đầu tiên, ZaiDrama sẽ tạo một dự án và đưa bạn đến trang dự án, nơi tin nhắn và tệp đính kèm của bạn tiếp tục trong cuộc trò chuyện với Zai bên trong dự án. Trang chủ không lưu riêng lịch sử trò chuyện; mỗi dự án có đúng một cuộc trò chuyện với Zai chạy từ các cuộc thảo luận lập kế hoạch cho đến video hoàn chỉnh. Dự án bắt đầu là "Untitled Project" và Zai sẽ đổi tên sau khi đọc văn bản nguồn.

## 3. Làm quen với trang dự án {#project-workspace}

Trang dự án được chia thành ba khu vực:

- **Khu vực chính: Cuộc trò chuyện với Zai**. Đây là nơi bạn đưa ra yêu cầu, trả lời câu hỏi và xác nhận báo giá; Zai báo cáo những gì nó đã làm ở từng bước tại đây.
- **Bên phải: Bàn làm việc**. Có thể thay đổi kích thước bằng cách kéo và thu gọn. "Board" luôn được ghim ở ngoài cùng bên trái; nhấp "+" để mở "Batches," "Documents," "Asset Library," và "Project Info." Khi dự án có sản phẩm, "Products" cũng xuất hiện. Mỗi trang là một tab có thể đóng.
- **Bên trái: Đề cương tiến độ sản xuất**. Hiển thị giai đoạn hiện tại qua "Pre-production / Scriptwriting / Asset Preparation / Episode-by-Episode Production / Final Delivery."

Khi bạn lần đầu vào một dự án, bàn làm việc tự động mở trang tương ứng với giai đoạn hiện tại của Zai; sau đó, việc chuyển sang trang nào là tùy bạn. Nhãn trạng thái ở giữa thanh trên cùng (ví dụ: "Producing · Storyboards 8/11" hoặc "Needs Your Decision") đưa bạn trở lại bảng chỉ bằng một cú nhấp.

## 4. Hoàn thiện kế hoạch với Zai {#confirm-project}

### 4.1 Xem lại kịch bản và câu hỏi {#script-review}

Nếu bạn cung cấp tiểu thuyết hoặc kịch bản, trước tiên Zai sẽ đọc và thực hiện xem lại kịch bản: xác định các tập bị thiếu, lỗ hổng logic, nhân vật nhàn rỗi và các tình tiết bất ngờ không có động cơ (tối đa 5 mục, mỗi mục kèm văn bản gốc và đề xuất khắc phục), rồi hỏi bạn có muốn thay đổi không.

Khi Zai cần bạn quyết định, nó sẽ bật lên một thẻ câu hỏi nằm phía trên hộp nhập: các tùy chọn có thể được đánh dấu "Recommended" và bạn có thể chọn chúng bằng phím số hoặc nhấn Esc để bỏ qua. Nếu không có tùy chọn nào phù hợp, chỉ cần gõ câu trả lời vào hộp nhập—nó vẫn được tính là phản hồi. Khi có nhiều câu hỏi được đặt cùng lúc, thẻ sẽ có tùy chọn "Other…" để trả lời riêng từng câu hỏi cụ thể. Việc chọn một tùy chọn như "I Have a Script / Novel" sẽ đưa bạn đến hộp nhập, nơi bạn có thể dán văn bản hoặc nhấp + để tải tệp lên.

### 4.2 Kế hoạch ba tầng {#choose-content-mode}

Zai sắp xếp các yêu cầu của bạn thành một kế hoạch ba tầng có thể chỉnh sửa:

- **Bản tóm tắt sáng tạo**: Làm gì, dành cho ai, sẽ xuất bản ở đâu, thời lượng bao lâu và dùng giọng điệu nào;
- **Mô hình thế giới**: Nhân vật (danh tính và ngoại hình), cảnh, đạo cụ, sản phẩm, phong cách thị giác và các quy tắc liên tục;
- **Bản thiết kế sản xuất**: Chia tác phẩm thành các phân đoạn, mỗi phân đoạn chỉ rõ loại, thời lượng, nhân vật tham gia và hướng dẫn hình ảnh/âm thanh.

Các dự án không yêu cầu chọn trước chế độ như "phim ngắn / kể chuyện / quảng cáo", cũng không yêu cầu chọn trước lộ trình "storyboard / reference image": mỗi phân đoạn tự quyết định lộ trình sản xuất của riêng mình, và một tác phẩm có thể kết hợp nhiều cách tiếp cận. Sau khi bạn nhập tiểu thuyết hoặc kịch bản, Zai cũng đề xuất một phong cách dự án (realistic, 3D comic drama hoặc 2D comic drama), mặc định là realistic.

Đối với các hành động không tính phí như sắp xếp kế hoạch, phân tích văn bản nguồn và viết bản nháp kịch bản đầu tiên, Zai chỉ cần hoàn thành rồi thông báo cho bạn. Nó chỉ bật lên thẻ xác nhận khi cần ghi đè nội dung mà chính bạn đã chỉnh sửa. Xem [Luồng sáng tạo](./workflows.md) để biết chi tiết.

### 4.3 Áp dụng kế hoạch và xác nhận sản xuất {#proposal-gate}

Khi kế hoạch đã hình thành, một biểu ngữ xác nhận xuất hiện phía trên cuộc trò chuyện:

- **Adopt Production Plan**: Khi kịch bản hoặc hình ảnh tài sản chưa sẵn sàng, hãy áp dụng kế hoạch trước; bước này không phát sinh phí.
- **Production Confirmation**: Tiêu đề thẻ ghi "Production will cost $N" (USD). Nhấp "View Details" để xem số lượng phân đoạn, số giây video, số lượng storyboard, số lượng hình ảnh bối cảnh, cũng như thay đổi số dư và các mục không bao gồm (chẳng hạn như làm lại). Sau khi nhấp "Approve and Start Production", ngân sách này được phân bổ cho dự án hiện tại và các bước trong ngân sách đó sẽ tự động tiến hành mà không làm gián đoạn bạn từng bước một.

Bạn có thể chỉ quay một phần dự án: bảo Zai "quay tập một trước" hoặc "chỉ quay hai phân đoạn đầu", báo giá và ngân sách sẽ chỉ bao gồm các phân đoạn đó, với tất cả storyboard và video tiếp theo nằm trong phạm vi đó.

Nếu một thẻ xác nhận đang hiển thị mà bạn gõ tin nhắn mới vào hộp nhập, thẻ đó sẽ bị vô hiệu hóa và Zai sẽ bắt đầu lại dựa trên yêu cầu mới của bạn.

## 5. Xem lại tài liệu và tài sản {#review-script-assets}

### 5.1 Tài liệu {#script-documents}

Trang "Documents" trong bàn làm việc liệt kê "Original Documents" và các kịch bản được nhóm theo "Batch N", với mỗi lô chứa "Batch Source" và "Official Script". Nhấp "Upload Source File" để thêm tài liệu.

Mở kịch bản chính thức để xem nội dung của từng phân đoạn. Khi một nhân vật có nhiều trang phục, mỗi phân đoạn phải chọn một trang phục từ menu thả xuống "Outfit"; các phân đoạn chưa chọn sẽ hiển thị "Not Selected" và phải được sửa trước khi tạo storyboard.

Kịch bản được Zai viết trực tiếp và bạn có thể xem lại và chỉnh sửa bất cứ lúc nào; nếu sau này Zai cần ghi đè nội dung bạn đã chỉnh sửa, nó sẽ hỏi ý kiến bạn trước.

### 5.2 Nhân vật, cảnh và đạo cụ {#asset-review}

Trang "Asset Library" nhóm các mục theo nhân vật, cảnh và đạo cụ, đồng thời cho phép bạn lọc, thêm mục mới hoặc tái sử dụng tài sản xuyên dự án qua "Select from Asset Library":

- **Hình ảnh tham khảo nhân vật**: Một ảnh cho mỗi nhân vật, bao gồm cận cảnh đầu-vai cùng các ảnh toàn thân chính diện, nghiêng và sau lưng; chúng đóng vai trò là mốc nhận dạng cho mọi lần tạo sau này.
- **Trang phục**: Một nhân vật có thể có nhiều trang phục (tóc, áo, quần, giày, phụ kiện). Các biến thể ngoài trang phục chính dùng ảnh tham khảo của trang phục chính làm mốc nhận dạng, vì vậy ảnh tham khảo của trang phục chính phải được tạo trước.
- **Giọng nói**: Bạn có thể đặt âm thanh tham khảo cho nhân vật, hoặc tạo một đoạn clip bằng TTS.
- **Lịch sử phiên bản**: Ảnh tài sản, storyboard và video đều hỗ trợ "Switch to This Version"; sau khi "Lock Current Version", các kết quả tạo lại chỉ đi vào các ứng viên lịch sử và sẽ không thay thế phiên bản hiện tại.

Các mục bạn thêm vào thư viện tài sản sẽ tự động được thông báo cho Zai. Khi định nghĩa tài sản thay đổi, storyboard và video đã tạo không bị ghi đè âm thầm; thay vào đó, chúng được đánh dấu là "older than current content", và việc có làm lại hay không là tùy bạn.

## 6. Theo dõi quá trình sản xuất {#run-production}

### 6.1 Bảng và trạng thái {#production-gates}

Sau khi sản xuất bắt đầu, "Board" trở thành bảng sản xuất:

- **Tiến độ theo từng trạm**: Năm trạm—Plan & Script, Setting Images, Storyboards, Videos và Final Cut;
- **Cần bạn quyết định**: Ví dụ, một bước vượt ngân sách và đang chờ xác nhận, hoặc một trạm có một số mục bị lỗi;
- **Sản phẩm mới nhất**: Nội dung mới tạo có gắn nhãn "New".

Mỗi bước trong cuộc trò chuyện báo cáo kết quả qua một thẻ kết quả, chẳng hạn như "Generate Video · Completed," "Using Production Budget," "Time Elapsed …"; lỗi một phần ghi "M of N failed, the rest completed."

### 6.2 Trang lô {#task-status}

Quá trình sản xuất diễn ra theo từng lô: khi tất cả storyboard và video trong một lô hoàn thành, nó chuyển sang lô tiếp theo. Thanh tiêu đề của trang "Batches" cho phép bạn chuyển giữa lô trước và lô sau, và cung cấp hai chế độ xem:

- **Preview** (mặc định): Phát liên tục lô này, với kịch bản quay cuộn từng dòng đồng bộ; mỗi phân đoạn cho phép bạn kiểm tra lời nhắc gửi đến mô hình video, với các track video và âm thanh riêng biệt bên dưới. Các phân đoạn thất bại nêu rõ lý do và cung cấp "Try Again."
- **Review & Edit**: Video đã biên soạn của lô này, trạng thái sản xuất, nhân vật của lô, ảnh storyboard, xem lại ứng viên và các clip video.

Để tạm dừng, tiếp tục hoặc hủy sản xuất, chỉ cần nói với Zai trong cuộc trò chuyện. Trạng thái tác vụ bao gồm Queued, In Progress, Completed, Failed, Canceled và Interrupted. Khi nền tảng khởi động lại, các video đã gửi đến dịch vụ mô hình vẫn tiếp tục chờ kết quả; một số ít tác vụ hình ảnh đang thực hiện có thể bị đánh dấu là interrupted và cần được tạo lại riêng lẻ.

### 6.3 Quay lại cục bộ {#rerun-and-versions}

Khi bạn không hài lòng với một phân đoạn, hãy nói rõ trong cuộc trò chuyện phân đoạn nào và cần thay đổi gì (ví dụ: "làm cô ấy lạnh lùng hơn ở phân đoạn 3"). Zai cung cấp so sánh cũ → mới; sau khi bạn xác nhận, chỉ video của phân đoạn đó được làm lại.

- Quay lại và sửa đổi tự động dùng một ngân sách làm lại riêng biệt và không tiêu tốn ngân sách sản xuất; nếu ngân sách làm lại không đủ, một thẻ xác nhận khác sẽ xuất hiện.
- Kết quả không vượt qua xác thực tự động sẽ được tự động sửa đổi; nếu cùng một vấn đề chạm giới hạn sửa đổi, nó sẽ được chuyển lại cho bạn quyết định.
- "Candidate Review" liệt kê các phiên bản ứng viên theo điểm số, với các tùy chọn "Select and Lock," "Reject," "Generate Another," hoặc "Revise Per Suggestion."

Các thay đổi bạn thực hiện trực tiếp trong bàn làm việc (như chuyển phiên bản hoặc biên soạn lại) để lại bản ghi trong cuộc trò chuyện, để Zai biết trước khi phát biểu lần tiếp theo.

## 7. Xem trước và tải xuống {#preview-and-export}

Mục "This Batch's Compiled Video" ở đầu chế độ xem "Review & Edit" trên trang lô cung cấp:

- Xem trước video đã biên soạn với nút bật/tắt "Final Cut Subtitles";
- "Download" cho video hoàn chỉnh;
- "Version History" để xem các bản cắt đã biên soạn trước đó, với "Current" đánh dấu phiên bản đang dùng;
- "Re-compile."

Trình phát phân đoạn video cung cấp:

- Đối với phân đoạn tường thuật, chuyển giữa "Original Audio Cut" và "TTS Overlay";
- "Download Editable Package": một tệp zip chứa video, âm thanh tường thuật, phụ đề (`.vtt` / `.srt`) và tệp mô tả, để chỉnh sửa thêm trong phần mềm video khác.

Kích thước, vị trí, màu sắc và phông chữ phụ đề có thể điều chỉnh trong "Project Info → Subtitle Style" và có hiệu lực từ lần biên soạn tiếp theo trở đi.

Chúng tôi khuyên bạn nên tải xuống các video hoàn chỉnh và tài liệu cần giữ lâu dài.

## 8. Mô hình và tham số {#provider-boundary}

Mục "Episode Parameters" trên trang "Project Info" có hai chế độ:

- **Auto mode**: Chỉ chọn "Video Quality" (Fast / Standard / High Quality) và tỷ lệ khung hình (Portrait 9:16 / Landscape 16:9); nền tảng quyết định mô hình.
- **Pro mode**: Chọn mô hình và độ phân giải theo từng trường hợp sử dụng (image-to-video, reference-to-video, text-to-image, image-to-image), mặc định là "Follow Global Routing"; bạn cũng có thể đặt có tạo âm thanh hay không và phong cách dự án.

Cả hai chế độ đều cho phép bạn đặt phương thức truyền tải lời tường thuật (lồng tiếng hậu kỳ hoặc lồng tiếng TTS) và kiểu phụ đề. Mục "Project Settings…" trong menu dự án cho phép bạn thay đổi phong cách dự án và mô hình, giọng nói, tốc độ lồng tiếng tường thuật. Mô hình hội thoại mà Zai sử dụng do nền tảng cấu hình và người dùng không thể chọn.

Các mô hình có thể chọn chỉ đến từ các ứng viên hiện đang mở trên nền tảng. Khi một khả năng không khả dụng, một tác vụ thất bại hoặc việc tính phí có vẻ không đúng, trước tiên hãy kiểm tra lý do thất bại trong cuộc trò chuyện; nếu vẫn chưa giải quyết được, hãy liên hệ bộ phận hỗ trợ khách hàng trực tuyến qua "Help & Feedback." Không bao giờ dán bất kỳ API Key hoặc mật khẩu nào vào cuộc trò chuyện.

## 9. Các bước tiếp theo {#next-steps}

- Đọc [Luồng sáng tạo](./workflows.md) để tìm hiểu về phân đoạn, lô, xác thực tự động và các điểm xác nhận;
- Đọc [Canvas sáng tạo](./canvas.md) để tự do thử nghiệm hình ảnh và video ngoài dự án;
- Đọc [Mô hình & Khả năng](./models.md) để hiểu ranh giới khả năng cho từng trường hợp sử dụng;
- Xem [Câu hỏi thường gặp](./faq.md) nếu bạn gặp vấn đề về tài khoản, sản xuất hoặc tải xuống.

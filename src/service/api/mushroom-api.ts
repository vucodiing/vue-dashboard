import mushroom, { defineAsyncResource, defineAsyncView, fireEvent, createRestfulAsyncFunction, IdType, IMushroom, Mushroom, MushroomRequest, MushroomRequestSetting, MushroomRestfulRequest, MushroomResponse, MushroomResponseDataType, MushroomResourceBase, MushroomListResource, MushroomCountResource, MushroomFindByIdResource, MushroomCreateResource, MushroomBatchCreateResource, MushroomUpdateResource, MushroomBatchUpdateResource, MushroomPartialUpdateResource, MushroomDeleteResource, MushroomBatchDeleteResource, MushroomExtensibleResource, MushroomViewFunction, MushroomError, IMushroomOfflineResponse, MushroomOfflineResponse, MushroomOfflineResponseState } from "mushroomjs";
import * as AuthExtension from "mushroomjs-auth";
import * as FileExtension from "mushroomjs-file";
export * from "mushroomjs";
export const extensions = {
    File: FileExtension,
    Auth: AuthExtension
};

export type ISODateValue = string | Date;
export type IdValue = string;

export interface CustomMethodRequest<TParam extends {}, TBody> extends MushroomRequest {
  params?: TParam;
  body?: TBody;
}

export interface CustomMethodParamsRequest<TParam extends {}> extends MushroomRequest {
  params?: TParam;
}

export interface CustomMethodBodyRequest<TBody> extends MushroomRequest {
  body?: TBody;
}

export interface User {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Tài khoản
     */
    account?: string | null;
    /**
     * Mật khẩu
     */
    password?: string | null;
    /**
     * Cho biết tài khoản có bị khóa đăng nhập hay không
     */
    disabled?: boolean | null;
    /**
     * Danh sách các quyền người dùng
     */
    roles?: Array<string | null | undefined> | null;
}

defineAsyncResource<User>({"name":"user","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{}},"views":{}});

export interface Profile {
    /**
     * Mã người dùng
     */
    id?: IdValue | null;
    /**
     * Họ tên người dùng
     */
    fullname?: string | null;
    /**
     * Ảnh đại diện
     */
    avatar_id?: IdValue | null;
    /**
     * Thông tin cơ bản
     */
    basic_info?: Profile_Basic_info | null;
    /**
     * Email người dùng
     */
    email?: string | null;
    /**
     * Số điện thoại người dùng
     */
    phone_number?: string | null;
    /**
     * Thông tin nhân viên (dành cho quyền Commune, CommuneAgent)
     */
    staff?: Profile_Staff | null;
    /**
     * Thời điểm tạo
     */
    created_time?: ISODateValue | null;
    /**
     * Mã người tạo
     */
    creator_id?: IdValue | null;
    /**
     * Thời điểm sửa cuối
     */
    last_modified_time?: ISODateValue | null;
    /**
     * Mã người sửa cuối
     */
    last_modifier_id?: IdValue | null;
}

export interface Profile_Basic_info {
    /**
     * Giới tính
     */
    gender?: string | null;
    /**
     * Ngày sinh
     */
    day_of_birth?: number | null;
    /**
     * Tháng sinh
     */
    month_of_birth?: number | null;
    /**
     * Năm sinh
     */
    year_of_birth?: number | null;
    /**
     * Nguyên quán
     */
    origin_place?: string | null;
    /**
     * Hộ khẩu thường trú
     */
    permanent_residence_place?: string | null;
    /**
     * Chỗ ở hiện nay
     */
    current_residence_place?: string | null;
    /**
     * Dân tộc
     */
    ethnicity_id?: IdValue | null;
    /**
     * Quốc tịch
     */
    nation_id?: IdValue | null;
    /**
     * Tôn giáo
     */
    religion_id?: IdValue | null;
}

export interface Profile_Staff {
    /**
     * Mã xã, phường
     */
    commune_id?: IdValue | null;
    /**
     * Quầy
     */
    booth?: string | null;
}

defineAsyncResource<Profile>({"name":"profile","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"updatePartially":{}},"views":{}});

export interface Province {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Cho biết tỉnh, thành phố còn tồn tại hay không
     */
    disabled?: boolean | null;
    /**
     * Mã tỉnh, thành phố (theo tổng cục thống kê)
     */
    code?: string | null;
    /**
     * Tên tỉnh, thành phố
     */
    name?: string | null;
    /**
     * Thứ tự sắp xếp của tỉnh, thành phố
     */
    index?: number | null;
    /**
     * Loại (Tỉnh hoặc Thành phố)
     */
    type?: string | null;
    center?: Province_Center | null;
}

export interface Province_Center {
    lng?: number | null;
    lat?: number | null;
}

defineAsyncResource<Province>({"name":"province","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true}},"views":{}});

export interface Commune {
    /**
     * Mã xã tự sinh
     */
    id?: IdValue | null;
    /**
     * Cho biết tỉnh, thành phố còn tồn tại hay không
     */
    disabled?: boolean | null;
    /**
     * Mã tỉnh
     */
    provinceId?: IdValue | null;
    /**
     * Tên phường, xã, đặc khu
     */
    name?: string | null;
    /**
     * Mã phường, xã
     */
    code?: string | null;
    /**
     * Thứ tự sắp xếp
     */
    index?: number | null;
    /**
     * Loại (Xã, Phường, Đặc khu)
     */
    type?: string | null;
    center?: Commune_Center | null;
}

export interface Commune_Center {
    lng?: number | null;
    lat?: number | null;
}

defineAsyncResource<Commune>({"name":"commune","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true}},"views":{}});

export interface Service_group {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Mã nhóm dịch vụ công cha
     */
    parent_id?: IdValue | null;
    /**
     * Đường dẫn nhóm dịch vụ
     */
    route?: string | null;
    /**
     * Tên nhóm dịch vụ công
     */
    name?: string | null;
    /**
     * Mã ảnh icon của nhóm
     */
    icon_id?: IdValue | null;
    /**
     * Thứ tự sắp xếp
     */
    index?: number | null;
}

defineAsyncResource<Service_group>({"name":"service_group","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{}},"views":{}});

export interface Service {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Mã nhóm dịch vụ công
     */
    group_id?: IdValue | null;
    /**
     * Đường dẫn dịch vụ
     */
    route?: string | null;
    /**
     * Mã dịch vụ công (trên cổng dịch vụ công)
     */
    code?: string | null;
    /**
     * Tên dịch vụ công
     */
    name?: string | null;
    /**
     * Thứ tự sắp xếp
     */
    index?: number | null;
    /**
     * Template thông tin tư vấn
     */
    consulting_template?: Service_Consulting_template | null;
    /**
     * Template thông tin xử lý hồ sơ
     */
    processing_template?: Service_Processing_template | null;
    /**
     * Danh sách tờ khai của dịch vụ
     */
    document_forms?: Array<Service_Document_forms | null | undefined> | null;
}

export interface Service_Consulting_template {
    /**
     * Mô tả ngắn gọn về dịch vụ
     */
    description?: string | null;
    /**
     * Tóm tắt ngắn
     */
    summary?: string | null;
    /**
     * Chuẩn bị trước khi thực hiện
     */
    preparation?: string | null;
    /**
     * Mức độ đáp ứng của dịch vụ: trực tuyến, toàn trình (online) hoặc trực tiếp, một phần (onsite)
     */
    type?: string | null;
    /**
     * Danh sách các bước thực hiện
     */
    progress?: string | null;
    /**
     * Phí, lệ phí (nếu có)
     */
    fee?: string | null;
    /**
     * Lưu ý quan trọng
     */
    note?: string | null;
    /**
     * Lưu ý quan trọng
     */
    checklist?: string | null;
    /**
     * Thời gian giải quyết hồ sơ
     */
    duration?: string | null;
}

export interface Service_Processing_template {
    /**
     * Danh sách hồ sơ, giấy tờ cần công dân mang theo
     */
    documents?: Array<string | null | undefined> | null;
}

export interface Service_Document_forms {
    /**
     * Mã file tờ khai
     */
    file_id?: IdValue | null;
}

defineAsyncResource<Service>({"name":"service","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{}},"views":{}});

export interface Session {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Mã cccd
     */
    id_number?: string | null;
    /**
     * Họ và tên
     */
    full_name?: string | null;
    /**
     * Thông tin thẻ cccd. Định dạng json
     */
    card_info?: string | null;
    /**
     * Dữ liệu tư vấn. Định dạng json
     */
    consulting_info?: string | null;
    /**
     * Thông tắt phiên tư vấn
     */
    consulting_summary?: string | null;
    /**
     * Mã code cho anonymous truy cập thông tin
     */
    display_code?: string | null;
    /**
     * Mã xã, phường
     */
    commune_id?: IdValue | null;
    /**
     * Thông tin xử lý hồ sơ
     */
    process_info?: Session_Process_info | null;
    /**
     * Mã dịch vụ công
     */
    service_id?: IdValue | null;
    /**
     * Thông tin phiếu in Số thứ tự
     */
    ticket?: Session_Ticket | null;
    /**
     * Ngày phục vụ
     */
    date?: ISODateValue | null;
    /**
     * Các thông tin thời điểm
     */
    time?: Session_Time | null;
}

export interface Session_Process_info {
    /**
     * Trạng thái xử lý hồ sơ
     */
    status?: string | null;
    /**
     * Tình trạng hồ sơ
     */
    application_status?: string | null;
    /**
     * Mã người xử lý
     */
    staff_id?: IdValue | null;
    /**
     * Ghi chú
     */
    note?: string | null;
    /**
     * Danh sách hồ sơ, giấy tờ mà công dân đã mang theo
     */
    documents?: Array<string | null | undefined> | null;
}

export interface Session_Ticket {
    /**
     * Số thứ tự trong ngày
     */
    index?: number | null;
    /**
     * Đã in phiếu
     */
    printed?: boolean | null;
    /**
     * Thời điểm in phiếu
     */
    time?: ISODateValue | null;
}

export interface Session_Time {
    /**
     * Thời điểm bắt đầu phục vụ
     */
    start?: ISODateValue | null;
    /**
     * Thời điểm chuyển sang processing
     */
    processing?: ISODateValue | null;
    /**
     * Thời điểm chuyển sang pending
     */
    pending?: ISODateValue | null;
    /**
     * Thời điểm hoàn thành
     */
    done?: ISODateValue | null;
    /**
     * Thời điểm hủy
     */
    cancelled?: ISODateValue | null;
}

export interface Session_Get_ticket_indexResult {
    /**
     * Số thứ tự tiếp theo
     */
    index: number;
    /**
     * Ngày phục vụ
     */
    day: ISODateValue;
}

export interface Session_Get_ticket_indexRequest {
    /**
     * Mã session
     */
    id: string;
}

export interface Session$CustomMethodResource {
    get_ticket_indexAsync: (request: CustomMethodBodyRequest<Session_Get_ticket_indexRequest>) => Promise<MushroomResponse<Session_Get_ticket_indexResult>>;
}
defineAsyncResource<Session>({"name":"session","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{},"_raw_http_method_get_ticket_index":{}},"views":{}});

export interface System_config {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
    /**
     * Quy định khả năng truy cập giá trị cấu hình
     */
    scope?: string | null;
    /**
     * Các role cho phép truy xuất giá trị cấu hình
     */
    roles?: Array<string | null | undefined> | null;
    /**
     * Mã cấu hình
     */
    code?: string | null;
    /**
     * Giá trị cấu hình
     */
    value?: string | null;
    /**
     * Ghi chú
     */
    note?: string | null;
}

defineAsyncResource<System_config>({"name":"system_config","actions":{"findMany":{"clientCache":true,"includeTotal":true},"findById":{"clientCache":true},"createOne":{},"updatePartially":{},"deleteOne":{}},"views":{}});

export interface Elevenlab {
    /**
     * Mã tự sinh
     */
    id?: IdValue | null;
}

export interface Elevenlab_Get_signed_urlResult {
    /**
     * Signed url
     */
    url?: string | null;
}

export interface Elevenlab$CustomMethodResource {
    get_signed_urlAsync: (request: MushroomRequest) => Promise<MushroomResponse<Elevenlab_Get_signed_urlResult>>;
}
defineAsyncResource<Elevenlab>({"name":"elevenlab","actions":{"_raw_http_method_get_signed_url":{}},"views":{}});


mushroom.$using("https://kiosk-dvc-api.test2.siten.vn/api/kioskdvc/v1/");

(function(){
AuthExtension.useAuth(AuthExtension.AuthLocalStorage, mushroom);
FileExtension.useFile(mushroom);
})();

export interface IApi extends IMushroom {
    /**
     * Thông tin tài khoản
     */
    user: MushroomResourceBase & MushroomListResource<User> & MushroomCountResource & MushroomFindByIdResource<User> & MushroomCreateResource<User> & MushroomPartialUpdateResource<User>,
    /**
     * Thông tin người dùng
     */
    profile: MushroomResourceBase & MushroomListResource<Profile> & MushroomCountResource & MushroomFindByIdResource<Profile> & MushroomPartialUpdateResource<Profile>,
    /**
     * Dữ liệu tỉnh, thành phố
     */
    province: MushroomResourceBase & MushroomListResource<Province> & MushroomCountResource & MushroomFindByIdResource<Province>,
    /**
     * Danh mục phường, xã
     */
    commune: MushroomResourceBase & MushroomListResource<Commune> & MushroomCountResource & MushroomFindByIdResource<Commune>,
    /**
     * Nhóm dịch vụ công
     */
    service_group: MushroomResourceBase & MushroomListResource<Service_group> & MushroomCountResource & MushroomFindByIdResource<Service_group> & MushroomCreateResource<Service_group> & MushroomPartialUpdateResource<Service_group> & MushroomDeleteResource,
    /**
     * Dịch vụ công
     */
    service: MushroomResourceBase & MushroomListResource<Service> & MushroomCountResource & MushroomFindByIdResource<Service> & MushroomCreateResource<Service> & MushroomPartialUpdateResource<Service> & MushroomDeleteResource,
    /**
     * Phiên phục vụ công dân
     */
    session: MushroomResourceBase & MushroomListResource<Session> & MushroomCountResource & MushroomFindByIdResource<Session> & MushroomCreateResource<Session> & MushroomPartialUpdateResource<Session> & MushroomDeleteResource & Session$CustomMethodResource,
    /**
     * Cấu hình hệ thống
     */
    system_config: MushroomResourceBase & MushroomListResource<System_config> & MushroomCountResource & MushroomFindByIdResource<System_config> & MushroomCreateResource<System_config> & MushroomPartialUpdateResource<System_config> & MushroomDeleteResource,
    /**
     * elevenlabs
     */
    elevenlab: MushroomResourceBase & Elevenlab$CustomMethodResource,
};

export type Api = AuthExtension.IMushroomAuth & FileExtension.IMushroomFile & IApi;

export default mushroom as Api;
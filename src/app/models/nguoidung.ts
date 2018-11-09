export class NguoiDung{
    TaiKhoan: string;
    MatKhau: string;
    Email: string;
    SoDT: string;
    MaNhom: string;
    MaLoaiNguoiDung: string;
    HoTen: string
    constructor(taiKhoan:string,matKhau:string,email:string,soDT:string,maNhom:string,maLoai:string,hoTen:string){
        this.TaiKhoan = taiKhoan;
        this.MatKhau = matKhau;
        this.Email = email;
        this.SoDT = soDT;
        this.MaNhom = maNhom;
        this.MaLoaiNguoiDung = maLoai;
        this.HoTen = hoTen;
    }
}
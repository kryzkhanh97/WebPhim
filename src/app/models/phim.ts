export class Phim{
    public MaPhim: string;
    public TenPhim: string;
    public Trailer: string;
    public HinhAnh: string;
    public MoTa: string;
    public MaNhom: string;
    public NgayKhoiChieu:string;
    public DanhGia: string;
    constructor(maPhim:string,tenPhim:string,trailer:string,hinhAnh:string,moTa:string,maNhom:string,ngayChieu:string,danhGia:string){
        this.MaPhim = maPhim;
        this.TenPhim = tenPhim;
        this.Trailer = trailer;
        this.HinhAnh = hinhAnh;
        this.MoTa = moTa;
        this.MaNhom = maNhom;
        this.NgayKhoiChieu = ngayChieu;
        this.DanhGia = danhGia;
    }
}

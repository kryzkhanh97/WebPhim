import '../../assets/css/index.css';
import { PhimService } from '../services/phimSV';
import { DanhSachPhim } from '../models/danhsachphim';
import { Phim } from '../models/phim';
import { NguoiDung } from "../models/nguoidung";
import {NguoiDungService} from "../services/nguoidungSV"

// Khởi tạo Instance từ lớp PhimService
const PhimSV = new PhimService();
const NguoiDungSV = new NguoiDungService();

let danhSachPhim:Phim[] = [];
let danhSachGioHang:Array<Phim> = [];
let danhSachNguoiDung:NguoiDung[] =[];

window.onload = function(){
    PhimSV.layDanhSachPhim().done(function(res){
        danhSachPhim = res;
        renderMovieItem();
    }).fail(function(err){
        console.log(err);
    })
}

let renderMovieItem = () => {
    // for in: Lấy ra số tứ tự phần tử của mảng
    // for of: Lấy ra tất cã thông tin của một phần tử trong mảng
    let content:string = '';
    for(let movie of danhSachPhim){
        // Destruc
        let {MaPhim,TenPhim,Trailer,HinhAnh,MoTa,MaNhom,NgayKhoiChieu,DanhGia} =movie
        content += `
        <div class="col-sm-6 col-md-3 text-center">
        <div class="movie__item">
            <img src="${HinhAnh}" onerror="this.onerror===null; this.src='https://increasify.com.au/wp-content/uploads/2016/08/default-image.png'" style="height:350px"class="img-fluid w-100">
            <div class="movie__overlay"></div>
                <div class="movie__detail w-100 text-center text-white">
                    <i class="fa fa-play d-block mx-auto mb-3 video-play venobox " href="https://youtu.be/aOXvyd9v1cg" data-vbtype="video"></i>
                    <p>
                        <a href="#" class="movie__icon"><i class="fa fa-file"></i></a>
                        <a 
                            data-maphim =${MaPhim}
                            data-tenphim =${TenPhim}
                            data-trailer =${Trailer}
                            data-hinhanh =${HinhAnh}
                            data-mota =${MoTa}
                            data-manhom =${MaNhom}
                            data-ngaychieu =${NgayKhoiChieu}
                            data-danhgia =${DanhGia}
                            class="movie__icon addToCart"><i class="fa fa-shopping-cart"></i></a>
                    </p>
                    <span>Released: ${NgayKhoiChieu ? NgayKhoiChieu.substr(0,10):'2018-20-10'}</span>
                </div>
            </div>
            <p class="movie__name text-center my-3">${TenPhim}</p>
            ${renderStar(parseInt(DanhGia))}
        </div>
        `
    }
    (<HTMLDivElement>document.getElementById('movieList')).innerHTML = content;
    themPhimGioHang('addToCart');
};
let renderStar = (num:number) => {
    let stars = ``;
    if(num){
        for(let i = 0; i < num; i++){
            stars += `
                <i class = "fa fa-star movie__star"></i>
            `
        }
        for(let k = 5; k > num ;k--){
            stars +=`
            <i class = "fa fa-star-o movie__star"></i>
            `
        }
    }else{
        for (let i= 0; i<5;i++){
            stars += `
                <i class=" fa fa-star movie__star"></i>
            `
        }
    }
    return stars;
}

let themPhimGioHang = (btnClass) => {
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for(let btn of btns){
        btn.addEventListener('click',function(){
            let maPhim = btn.getAttribute('data-maphim')
            let tenPhim = btn.getAttribute('data-tenphim')
            let trailer = btn.getAttribute('data-trailer')
            let hinhAnh = btn.getAttribute('data-hinhanh')
            let moTa = btn.getAttribute('data-mota')
            let maNhom = btn.getAttribute('data-manhom')
            let ngayChieu = btn.getAttribute('data-ngaychieu')
            let danhGia = btn.getAttribute('data-danhgia')
            
            let PhimItem = new Phim(maPhim,tenPhim,trailer,hinhAnh,moTa,maNhom,ngayChieu,danhGia)
            // Kiểm tra sản phẩm đã có hay chưa
            let index = timPhimTheoMa(PhimItem.MaPhim);
            if (index === -1){
                // Spread Operator
                danhSachGioHang = [...danhSachGioHang,PhimItem];
            }
            localStorage.setItem("cartList",JSON.stringify(danhSachGioHang));
            (<HTMLSpanElement>document.getElementById("totalAmount")).innerHTML = danhSachGioHang.length.toString();
        })
    }
}

let timPhimTheoMa = (maPhim:string) =>{
    for(let movie of danhSachGioHang){
        if(movie.MaPhim === maPhim){
            return 1;
        }
    }
    return -1
}


let dangKy = () =>{
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoan')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatKhau')).value;
    let hoTen = (<HTMLInputElement>document.getElementById('HoTen')).value;
    let email = (<HTMLInputElement>document.getElementById('Email')).value;
    let soDT = (<HTMLInputElement>document.getElementById('SoDT')).value;
    let maNhom = 'GP01';
    let maLoaiNguoiDung = 'KhachHang';

    
    let NguoiDungMoi = new NguoiDung(taiKhoan, matKhau, hoTen, email, soDT, maNhom, maLoaiNguoiDung);
    NguoiDungSV.DangKy(NguoiDungMoi).done(function(kq){
        if(typeof(kq)!== 'string'){
            alert('success');
        }
    }).fail(function(erro){
        console.log(erro);
    })
}

let dangNhap = () =>{
    let taiKhoan = (<HTMLInputElement>document.getElementById('TaiKhoanDangNhap')).value;
    let matKhau = (<HTMLInputElement>document.getElementById('MatKhauDangNhap')).value;

    NguoiDungSV.DangNhap(taiKhoan,matKhau).done(function(kq){
        if(typeof(kq) !== 'string'){
            (<HTMLButtonElement>document.getElementById('btnClose')).click();
        }
    }).fail(function(err){
        console.log(err);
    })
}

// let getUser = () => {
//     let localUser = JSON.parse(localStorage.getItem('UserInfo');
//     if(localUser){
//         (<HTMLSpanElement>document.getElementById('userInfo')).style.display = 'inline';
//         (<HTMLSpanElement>document.getElementById('userName')).innerHTML = localUser.TaiKhoan;
//     }
// }

(<HTMLButtonElement>document.getElementById('btnDangKy')).addEventListener('click',dangKy);
(<HTMLButtonElement>document.getElementById('btnDangNhap')).addEventListener('click',dangNhap)
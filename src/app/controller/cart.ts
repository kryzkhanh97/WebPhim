import '../../assets/css/cart.css';
import { Phim } from '../models/phim';

let danhSachGioHang:Phim[] = [];
window.onload = () => {
    if(localStorage.getItem('cartList')){
        danhSachGioHang = JSON.parse(localStorage.getItem('cartList'));

    }
    taoBang();
}

let taoBang = () => {
    let content ='';
    for (let i in danhSachGioHang ){
        let {TenPhim,NgayKhoiChieu,HinhAnh,DanhGia,MaPhim} = danhSachGioHang[i];
        content +=`
            <tr>
                <td>${parseInt(i)+1}</td>
                <td>${TenPhim}</td>
                <td>${NgayKhoiChieu}</td>
                <td> <img src="${HinhAnh}" style="width:100px;height:100px;"/> </td>
                <td>${DanhGia}</td>

                <td>
                    <button data-maphim="${MaPhim}" class="btn btn-info btnXoa">Xóa</button>
                </td>
            </tr>
        `
    }
    (<HTMLTableElement>document.getElementById('tbodyContent')).innerHTML = content;
    xoaPhim("btnXoa")
}

let timPhimTheoMa = (movieArr:Phim[],maPhim:string) =>{
    for(let i in movieArr){
        if(movieArr[i].MaPhim === maPhim){
            return parseInt(i);
        }
    }
    return -1
}

let xoaPhim = (btnClass) => {
    let btns:any = <HTMLCollection>document.getElementsByClassName(btnClass);
    for(let btn of btns){
        btn.addEventListener('click',function(){
            let maPhim = btn.getAttribute('data-maphim');
            let index = timPhimTheoMa(danhSachGioHang,maPhim);
            if(index !== -1){
                danhSachGioHang.splice(index,1);
            }
        localStorage.setItem('cartList',JSON.stringify(danhSachGioHang));
        taoBang();
        })
    }
}
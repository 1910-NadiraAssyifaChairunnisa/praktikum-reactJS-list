import React, { Component } from "react";
import $ from "jquery";
import Card from "../components/cardKeranjang"
class Keranjang extends Component {
    constructor() {
        super()
        this.state = {
            keranjang: [
                {
                    mug: "Brown Mug",
                    harga: 129000,
                    jumlah: 1,
                    gambar: "https://cdn.pixabay.com/photo/2014/09/24/17/13/mugs-459324_960_720.jpg"
                },
                {
                    album: "Coffe Mug",
                    harga: 110000,
                    jumlah: 2,
                    gambar: "https://cdn.pixabay.com/photo/2020/04/19/11/52/drink-5063295_960_720.jpg"
                },
                {
                    album: "Flower Mug",
                    harga: 575000,
                    jumlah: 1,
                    gambar: "https://cdn.pixabay.com/photo/2018/08/03/05/57/tea-3581131_960_720.jpg"
                },
            ],

            action: "",
            mug: "",
            gambar: "",
            harga: 0,
            jumlah: 0,
            selectedItem: null,
        }
        this.state.filterKeranjang = this.state.keranjang
    }
    render() {
        return (
            <div className="container">
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={ev => this.setState({ keyword: ev.target.value })}
                    onKeyUp={ev => this.searching(ev)}
                />
                <div className="row">
                    {this.state.filterKeranjang.map((item, index) => (
                        <Card
                            mug={item.mug}
                            gambar={item.gambar}
                            harga={item.harga}
                            jumlah={item.jumlah}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>
                <button className="btn btn-success" onClick={() => this.Add()} >
                    Tambah Mug
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_keranjang">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Keranjang
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Mug
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.mug}
                                        onChange={ev => this.setState({
                                            mug:
                                                ev.target.value
                                        })}
                                        required />

                                    Harga Mug
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.harga}
                                        onChange={ev => this.setState({
                                            harga:
                                                ev.target.value
                                        })}
                                        required />

                                    Jumlah Mug
                                    <input type="number" className="form-control mb-2"
                                        value={this.state.jumlah}
                                        onChange={ev => this.setState({
                                            jumlah:
                                                ev.target.value
                                        })}
                                        required />

                                    Gambar Mug
                                    <input type="url" className="form-control mb-2"
                                        value={this.state.gambar}
                                        onChange={ev => this.setState({
                                            gambar:
                                                ev.target.value
                                        })}
                                        required />

                                    <button className="btn btn-info btn-block" type="submit">
                                        Simpan
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    Add = () => {
        // menampilkan komponen modal
        $("#modal_keranjang").show();
        this.setState({
            mug: "",
            gambar: "",
            harga: 0,
            jumlah: 0,
            action: "insert"
        })
    }

    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_keranjang").show();
        this.setState({
            mug: item.mug,
            gambar: item.gambar,
            jumlah: item.jumlah,
            harga: item.harga,
            action: "update",
            selectedItem: item
        })
    }

    Save = (event) => {
        event.preventDefault();
        // menampung data state keranjang
        let tempKeranjang = this.state.keranjang
        if (this.state.action === "insert") {
            // menambah data baru
            tempKeranjang.push({
                mug: this.state.mug,
                harga: this.state.harga,
                jumlah: this.state.jumlah,
                gambar: this.state.gambar,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempKeranjang.indexOf(this.state.selectedItem)
            tempKeranjang[index].mug = this.state.mug
            tempKeranjang[index].jumlah = this.state.jumlah
            tempKeranjang[index].harga = this.state.harga
            tempKeranjang[index].gambar = this.state.gambar
        }
        this.setState({ keranjang: tempKeranjang })
        // menutup komponen modal_keranjang
        $("#modal_keranjang").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempKeranjang = this.state.keranjang
            // posisi index data yg akan dihapus
            let index = tempKeranjang.indexOf(item)
            // hapus data
            tempKeranjang.splice(index, 1)
            this.setState({ keranjang: tempKeranjang })
        }
    }

    searching = event => {
        if (event.keyCode === 13) {
            // 13 adalah kode untuk tombol enter
            let keyword = this.state.keyword.toLowerCase()
            let tempKeranjang = this.state.keranjang
            let result = tempKeranjang.filter(item => {
                return item.album.toLowerCase().includes(keyword)
            })
            this.setState({ filterKeranjang: result })
        }
    }
}
export default Keranjang;
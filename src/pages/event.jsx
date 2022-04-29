import React, { Component } from "react";
import $ from "jquery";
import Card from "../components/cardEvent.jsx"
class Event extends Component {
    constructor() {
        super()
        this.state = {
            event: [
                {
                    nama: "Hari Menanam Pohon Sedunia",
                    tanggal: "28 November 2022",
                    lokasi: "Hutan",
                    gambar: "https://i0.wp.com/rdk.fidkom.uinjkt.ac.id/wp-content/uploads/2021/11/Delima-Luzen-Ahmad_Jumat-19-November-2021_Ilustrasi-Pohon-dan-Bumi_Reaktor.co_.id_Berita-Ke-2.jpg?w=541"
                },
                {
                    nama: "Tebar Benih Ikan",
                    tanggal: "5 Agustus 2022",
                    lokasi: "Sungai Kapuas",
                    gambar: "https://static.republika.co.id/uploads/images/inpicture_slide/kegiatan-tebar-benih-ikan-di-kabupaten-sleman-diy-oleh_210118172149-946.jpg"
                },
                {
                    nama: "Hari Hutan Sedunia",
                    tanggal: "21 Maret 2022",
                    lokasi: "Hutan Pinus",
                    gambar: "https://png.pngtree.com/png-clipart/20201208/original/pngtree-earth-and-tree-international-forest-day-elements-png-image_5569181.jpg"
                },
            ],

            action: "",
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            selectedItem: null,
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.event.map((item, index) => (
                        <Card
                            nama={item.nama}
                            tanggal={item.tanggal}
                            lokasi={item.lokasi}
                            gambar={item.gambar}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                        />
                    ))}
                </div>

                <button className="btn btn-success" onClick={() => this.Add()}>

                    Tambah Data
                </button>

                {/* component modal sbg control manipulasi data */}
                <div className="modal" id="modal_event">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {/* modal header */}
                            <div className="modal-body">
                                Form Event
                            </div>
                            {/* modal body */}
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Event :
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.nama}
                                        onChange={ev => this.setState({
                                            nama:
                                                ev.target.value
                                        })}
                                        required />

                                    Tanggal :
                                    <input type="text" className="form-control mb-2"
                                        value={this.state.tanggal}
                                        onChange={ev => this.setState({
                                            tanggal
                                                : ev.target.value
                                        })}
                                        required />

                                    Lokasi :
                                    <input type="text" className="form-control b-2"
                                        value={this.state.lokasi}
                                        onChange={ev => this.setState({ lokasi: ev.target.value })}
                                        required />

                                    Gambar Event :
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
        $("#modal_event").show();
        this.setState({
            nama: "",
            tanggal: "",
            lokasi: "",
            gambar: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        // menampilkan komponen modal
        $("#modal_event").show();
        this.setState({
            nama: item.nama,
            tanggal: item.tanggal,
            lokasi: item.lokasi,
            gambar: item.gambar,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        // menampung data state event
        let tempEvent = this.state.event
        if (this.state.action === "insert") {
            // menambah data baru
            tempEvent.push({
                nama: this.state.nama,
                tanggal: this.state.tanggal,
                lokasi: this.state.lokasi,
                gambar: this.state.gambar,
            })
        } else if (this.state.action === "update") {
            // menyimpan perubahan data
            let index = tempEvent.indexOf(this.state.selectedItem)
            tempEvent[index].nama = this.state.nama
            tempEvent[index].tanggal = this.state.tanggal
            tempEvent[index].lokasi = this.state.lokasi
            tempEvent[index].gambar = this.state.gambar
        }
        this.setState({ event: tempEvent })
        // menutup komponen modal_event
        $("#modal_event").hide();
    }

    Drop = (item) => {
        // beri konfirmasi untuk menghapus data
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            // menghapus data
            let tempEvent = this.state.event
            // posisi index data yg akan dihapus
            let index = tempEvent.indexOf(item)
            // hapus data
            tempEvent.splice(index, 1)
            this.setState({ event: tempEvent })
        }
    }

}
export default Event;
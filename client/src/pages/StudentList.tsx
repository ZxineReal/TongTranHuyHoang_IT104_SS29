import React, { useEffect, useState } from "react";

interface Student {
  id: number;
  student_name: string;
  email: string;
  address: string;
  phone: string;
  status: boolean;
  created_at: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [newStudent, setNewStudent] = useState({
    student_name: "",
    email: "",
    address: "",
    phone: "",
    status: true,
  });

  const getAllStudent = async () => {
    try {
      const res = await fetch("http://localhost:8080/student");
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
      setStudents([]);
    }
  };

  useEffect(() => {
    getAllStudent();
  }, []);

  const handleSearchById = async () => {
    if (!searchId) {
      getAllStudent();
      return;
    }
    try {
      const res = await fetch(`http://localhost:8080/student/${searchId}`);
      const data = await res.json();
      setStudents([data]);
    } catch (error) {
      console.log(error);
      setStudents([]);
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newStudent,
          created_at: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("Error adding student");
      setShowAddModal(false);
      setNewStudent({
        student_name: "",
        email: "",
        address: "",
        phone: "",
        status: true,
      });
      getAllStudent();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`http://localhost:8080/student/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error deleting student");
      setShowDeleteModal(false);
      setDeleteId(null);
      getAllStudent();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-blue-900 text-white p-4 flex justify-between items-center rounded-t">
        <p className="text-lg font-semibold">Quản lý sinh viên</p>
        <div className="space-x-2">
          <input
            type="number"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Nhập ID sinh viên"
            className="px-2 py-1 text-black rounded"
          />
          <button
            onClick={handleSearchById}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Tìm sinh viên theo ID
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            Thêm mới sinh viên
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-b">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Tên sinh viên</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Địa chỉ</th>
              <th className="px-4 py-2 text-left">Số điện thoại</th>
              <th className="px-4 py-2 text-center">Lựa chọn</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-2">{s.student_name}</td>
                <td className="px-4 py-2">{s.email}</td>
                <td className="px-4 py-2">{s.address}</td>
                <td className="px-4 py-2">{s.phone}</td>
                <td className="px-4 py-2 text-center">
                  <button className="text-yellow-500 hover:text-yellow-600 mr-2">
                    Sửa
                  </button>
                  <button
                    onClick={() => {
                      setDeleteId(s.id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-500 hover:text-red-600"
                  >
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-3 text-sm text-gray-500">
          Hiển thị {students.length} bản ghi
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Thêm sinh viên</h2>
            <form onSubmit={handleAddStudent} className="space-y-2">
              <input
                type="text"
                placeholder="Tên sinh viên"
                value={newStudent.student_name}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, student_name: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newStudent.email}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, email: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Địa chỉ"
                value={newStudent.address}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, address: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                value={newStudent.phone}
                onChange={(e) =>
                  setNewStudent({ ...newStudent, phone: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              Bạn có chắc chắn muốn xóa sinh viên ID {deleteId}?
            </h2>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

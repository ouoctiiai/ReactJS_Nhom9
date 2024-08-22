import React, { useState, useEffect } from "react";
import {
  BsPlusLg,
  BsFileEarmarkArrowDown,
  BsPencil,
  BsTrash3,
  BsSearch,
  BsEye,
} from "react-icons/bs";
import "./Content.css";

// Khai báo interface cho dữ liệu người dùng
interface User {
  UserName: string;
  Gender: string;
  University: string;
  Phone: string;
  Birthday: string;
  IDUser: string;
}

function Content() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] =
    useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [universities, setUniversities] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [genders, setGenders] = useState<string[]>([]);

  // Fetch dữ liệu người dùng từ API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://66c5bd04134eb8f434956afd.mockapi.io/api/profiles"
        );
        const data: User[] = await response.json(); // Type assertion here
        setUsers(data);
        setFilteredUsers(data);

        // Extract unique values for dropdowns
        const uniqueUniversities = Array.from(
          new Set(data.map((user) => user.University))
        );
        const uniqueYears = Array.from(
          new Set(data.map((user) => user.Birthday.split("/")[2]))
        ); // Extract year from Birthday
        const uniqueGenders = Array.from(
          new Set(data.map((user) => user.Gender))
        );

        setUniversities(["All University", ...uniqueUniversities]);
        setYears(["All Years", ...uniqueYears]);
        setGenders(["All Gender", ...uniqueGenders]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUsers();
  }, []);

  // Lọc người dùng theo từ khóa tìm kiếm
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const result = users.filter(
      (user) =>
        user.UserName.toLowerCase().includes(lowerCaseQuery) ||
        user.University.toLowerCase().includes(lowerCaseQuery) ||
        user.Phone.toLowerCase().includes(lowerCaseQuery) ||
        user.Birthday.toLowerCase().includes(lowerCaseQuery) ||
        user.Gender.toLowerCase().includes(lowerCaseQuery) ||
        user.IDUser.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredUsers(result);
  }, [searchQuery, users]);

  const handleViewProfile = (user: User) => {
    setSelectedUser(user);
  };

  const handleEditProfile = (user: User) => {
    setEditUser(user);
    setIsEditing(true);
  };
  const [isAdding, setIsAdding] = useState<boolean>(false);
const [newUser, setNewUser] = useState<User>({
  UserName: "",
  Gender: "",
  University: "",
  Phone: "",
  Birthday: "",
  IDUser: "",
});


  const handleSaveEdit = () => {
    if (editUser) {
      fetch(
        `https://66c5bd04134eb8f434956afd.mockapi.io/api/profiles/${editUser.IDUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editUser),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUsers(
            users.map((user) => (user.IDUser === data.IDUser ? data : user))
          );
          setFilteredUsers(
            filteredUsers.map((user) =>
              user.IDUser === data.IDUser ? data : user
            )
          );
          setIsEditing(false);
          setEditUser(null);
        })
        .catch((error) => console.error("Error updating data:", error));
    }
  };
const handleAddNew = () => {
  fetch(
    "https://66c5bd04134eb8f434956afd.mockapi.io/api/profiles",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }
  )
  if (!newUser.UserName || !newUser.Gender || !newUser.University || !newUser.Phone || !newUser.Birthday) {
    alert('Please fill in all fields except ID.');
    return;
  }
  const { IDUser, ...userToAdd } = newUser;

  fetch(
    "https://66c5bd04134eb8f434956afd.mockapi.io/api/profiles",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToAdd),
    }
  )
  
  .then((response) => response.json())
  .then((data) => {
    setUsers([...users, data]);
    setFilteredUsers([...filteredUsers, data]);
    setIsAdding(false);
    setNewUser({
      UserName: "",
      Gender: "",
      University: "",
      Phone: "",
      Birthday: "",
      IDUser: "", // Đặt lại IDUser thành chuỗi rỗng
    });
  })
  .catch((error) => console.error("Error adding new user:", error));
};
  const handleDeleteProfile = (user: User) => {
    setUserToDelete(user);
    setIsDeleteConfirmVisible(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      fetch(
        `https://66c5bd04134eb8f434956afd.mockapi.io/api/profiles/${userToDelete.IDUser}`,
        {
          method: "DELETE",
        }
      )
        .then(() => {
          setUsers(users.filter((user) => user.IDUser !== userToDelete.IDUser));
          setFilteredUsers(
            filteredUsers.filter((user) => user.IDUser !== userToDelete.IDUser)
          );
          setIsDeleteConfirmVisible(false);
          setUserToDelete(null);
        })
        .catch((error) => console.error("Error deleting data:", error));
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmVisible(false);
    setUserToDelete(null);
  };

  const handleUniversityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const filtered = users.filter(
      (user) => selectedValue === "0" || user.University === selectedValue
    );
    setFilteredUsers(filtered);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    const filtered = users.filter(
      (user) =>
        selectedYear === "0" || user.Birthday.split("/")[2] === selectedYear
    );
    setFilteredUsers(filtered);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = e.target.value;
    const filtered = users.filter(
      (user) => selectedGender === "0" || user.Gender === selectedGender
    );
    setFilteredUsers(filtered);
  };

  return (
    <main className="main-container">
    <div className="container">
      {/* Phần tiêu đề */}
      <div className="column">
        <div className="item item1">
          <div className="mage-useprofile">
            <div className="usp">User Profile</div>
            <div className="mage">Manage your User Profile</div>
          </div>
          <div className="dow-add">
            <div className="dow">
              <BsFileEarmarkArrowDown />
              Download
            </div>
            <div
              className="add"
              onClick={() => setIsAdding(true)}
            >
              <BsPlusLg className="iconplus" />
              Add New
            </div>
          </div>
        </div>
      </div>

        {/* Phần tìm kiếm và lọc */}
        <div className="column col2">
          <div className="item item2-container">
            <div className="item2-part1">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <BsSearch className="search-icon" />
              </div>
            </div>
            <div className="item2-part2">
              <div className="sub-item">
                <select id="dropdown1" onChange={handleUniversityChange}>
                  {universities.map((university, index) => (
                    <option
                      key={index}
                      value={university === "All University" ? "0" : university}
                    >
                      {university}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sub-item">
                <select id="dropdown2" onChange={handleYearChange}>
                  {years.map((year, index) => (
                    <option
                      key={index}
                      value={year === "All Years" ? "0" : year}
                    >
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sub-item">
                <select id="dropdown3" onChange={handleGenderChange}>
                  {genders.map((gender, index) => (
                    <option
                      key={index}
                      value={gender === "All Gender" ? "0" : gender}
                    >
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Phần danh sách người dùng */}
        <div className="column itemcontainer">
          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="userName">
                User Name
              </div>
            </div>
          </div>

          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="university">
                University
              </div>
            </div>
          </div>

          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="phone">
                Phone
              </div>
            </div>
          </div>

          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="birthday">
                Birthday
              </div>
            </div>
          </div>

          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="profilestt">
                Gender
              </div>
            </div>
          </div>

          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="idUser">
                ID
              </div>
            </div>
          </div>

          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="action">
                Action
              </div>
            </div>
          </div>
        </div>

        <div className="column fulluser">
          {filteredUsers.map((user, index) => (
            <div className="item item4" key={index}>
              <div className="itemuser">
                <div className="nameuser">{user.UserName}</div>
                <div className="literacy">{user.University}</div>
                <div className="phone">{user.Phone}</div>
                <div className="birhday">{user.Birthday}</div>
                <div className="gender">
                  <div className="sub-item-status">
                    <option value="0">{user.Gender}</option>
                  </div>
                </div>
                <div className="accont">{user.IDUser}</div>
                <div className="action">
                  <div
                    className="view-profile"
                    onClick={() => handleViewProfile(user)}
                  >
                    <BsEye />
                  </div>
                  <div
                    className="edit-profile"
                    onClick={() => handleEditProfile(user)}
                  >
                    <BsPencil />
                  </div>
                  <div
                    className="delete-profile"
                    onClick={() => handleDeleteProfile(user)}
                  >
                    <BsTrash3 />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bố cục dành cho màn hình nhỏ */}
        <div className="column itemcontainermb">
          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="idUser">
                User Name
              </div>
            </div>
          </div>
          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="action">
                ID
              </div>
            </div>
          </div>
          <div className="item itemm">
            <div className="sub-item1">
              <div className="status-action" id="userName">
                Action
              </div>
            </div>
          </div>
        </div>

        <div className="column fullusermb">
          {filteredUsers.map((user, index) => (
            <div className="item item4" key={index}>
              <div className="itemuser">
                <div className="nameuser">{user.UserName}</div>
                <div className="accont">{user.IDUser}</div>
                <div className="action">
                  <div
                    className="view-profilemb"
                    onClick={() => handleViewProfile(user)}
                  >
                    <BsEye />
                  </div>
                  <div
                    className="edit-profilemb"
                    onClick={() => handleEditProfile(user)}
                  >
                    <BsPencil />
                  </div>
                  <div
                    className="delete-profilemb"
                    onClick={() => handleDeleteProfile(user)}
                  >
                    <BsTrash3 />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hiển thị bảng thông tin người dùng */}
        {selectedUser && (
          <div className="user-info-modal">
            <h2>Profile Information</h2>
            <p>
              <strong>User Name:</strong> {selectedUser.UserName}
            </p>
            <p>
              <strong>University:</strong> {selectedUser.University}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.Phone}
            </p>
            <p>
              <strong>Birthday:</strong> {selectedUser.Birthday}
            </p>
            <p>
              <strong>Gender:</strong> {selectedUser.Gender}
            </p>
            <p>
              <strong>ID:</strong> {selectedUser.IDUser}
            </p>
            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        )}

        {/* Hiển thị modal chỉnh sửa thông tin người dùng */}
        {isEditing && editUser && (
          <div className="edit-info-modal">
            <h2>Edit Profile</h2>
            <form>
              <label>
                User Name:
                <input
                  type="text"
                  value={editUser.UserName}
                  onChange={(e) =>
                    setEditUser({ ...editUser, UserName: e.target.value })
                  }
                />
              </label>
              <label>
                University:
                <input
                  type="text"
                  value={editUser.University}
                  onChange={(e) =>
                    setEditUser({ ...editUser, University: e.target.value })
                  }
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  value={editUser.Phone}
                  onChange={(e) =>
                    setEditUser({ ...editUser, Phone: e.target.value })
                  }
                />
              </label>
              <label>
                Birthday:
                <input
                  type="text"
                  value={editUser.Birthday}
                  onChange={(e) =>
                    setEditUser({ ...editUser, Birthday: e.target.value })
                  }
                />
              </label>
              <label>
                Gender:
                <input
                  type="text"
                  value={editUser.Gender}
                  onChange={(e) =>
                    setEditUser({ ...editUser, Gender: e.target.value })
                  }
                />
              </label>
              <button type="button" onClick={handleSaveEdit}>
                Save
              </button>
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Hiển thị modal xác nhận xóa */}
        {isDeleteConfirmVisible && (
          <div className="delete-confirm-modal">
            <div>
              <h2>Confirm Delete</h2>
              <p>Are you sure you want to delete this user?</p>
              <div className="modal-content">
                <button onClick={handleConfirmDelete}>Yes</button>
                <button className="cancel" onClick={handleCancelDelete}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}
         {/* Hiển thị modal thêm mới người dùng */}
         {isAdding && (
  <div className="add-info-modal">
    <h2>Add New Profile</h2>
    <form>
      <label>
        User Name:
        <input
          type="text"
          value={newUser.UserName}
          onChange={(e) =>
            setNewUser({ ...newUser, UserName: e.target.value })
          }
          required
        />
      </label>
      <label>
        University:
        <input
          type="text"
          value={newUser.University}
          onChange={(e) =>
            setNewUser({ ...newUser, University: e.target.value })
          }
          required
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={newUser.Phone}
          onChange={(e) =>
            setNewUser({ ...newUser, Phone: e.target.value })
          }
          required
        />
      </label>
      <label>
        Birthday:
        <input
          type="text"
          value={newUser.Birthday}
          onChange={(e) =>
            setNewUser({ ...newUser, Birthday: e.target.value })
          }
          required
        />
      </label>
      <label>
        Gender:
        <input
          type="text"
          value={newUser.Gender}
          onChange={(e) =>
            setNewUser({ ...newUser, Gender: e.target.value })
          }
          required
        />
      </label>

      <div className="buttonAdd">
        <button
          type="button"
          onClick={() => handleAddNew()}
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setIsAdding(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
)}

        {/* Phần phân trang */}
          <div className="pagination">
            <button className="page-button">{'<'}</button>
            <button className="page-number active">1</button>
            <button className="page-number">2</button>
            <button className="page-number">3</button>
            <span className="pagination-dots">...</span>
            <button className="page-number">10</button>
            <button className="page-button">{'>'}</button>
        </div>
      </div>
    </main>
  );
}

export default Content;

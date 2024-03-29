import React, { useState, useRef, useEffect } from "react";
import "../../Style/Friendlist.css";

const Friendlist = () => {
  const modalRef = useRef(null); // 모달 참조를 생성
  const [isOpen, setIsOpen] = useState(false); // 모달의 열림/닫힘 상태를 저장

  useEffect(() => {
    // 모달이 열릴 때 바깥 영역을 클릭하여 모달이 닫히도록 이벤트를 추가
    const handleClickOutside = (event) => {
      console.log("Clicked outside");
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        // 모달 바깥을 클릭하면 모달을 닫음
        setIsOpen(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 모달을 열고 닫는 함수
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleModal}>모달 열기</button>

      {/*모달*/}
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content" ref={modalRef}>
          <span className="close" onClick={toggleModal}>
            &times;
          </span>
          <p>친구 목록</p>
          <div className="fm">
            <ul>곽태욱</ul>
            <ul>이혜성</ul>
            <ul>소선호</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friendlist;

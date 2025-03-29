import React from 'react'

const Footer = () => {
  return (
    <div style={{
        width: "100%",
        height: "auto",
        padding: "40px",
        display: "flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        gap:"12px",
        borderTop: "1px solid #e4e4e4",
        backgroundColor: "#ffffff"
    }} >
      <p style={{
        font:"500 14px Inter"
      }} >© eComm. 2025</p>
      <p style={{
        font:"500 14px Inter"
      }} >Developed and Designed By Priyavart V. 🚀</p>
    </div>
  )
}

export default Footer;

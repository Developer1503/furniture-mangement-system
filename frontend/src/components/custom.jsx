import React from 'react';
import choose_material from '../assets/choose_material.jpg'; // Adjust path as needed

function App() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      backgroundColor: "#f8f4ea",
      color: "#000",
    },
    headerSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "20px",
    },
    image: {
      width: "90%", // Adjust the size of the image
      maxWidth: "400px", // Set a maximum width
      height: "450px", // Maintain aspect ratio
      borderRadius: "30px",
      padding: "20px",
      marginRight: "150px",
    },

    textBlock: {
      flex: "1",
      textAlign: "left",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "10px",
      padding: "20px",
      marginRight: "300px",
      marginLeft: "100px",
      marginTop: "-100px"
    },
    paragraph: {
      lineHeight: "1.6",
      padding: "20px",
      marginRight: "300px",
      marginLeft: "100px"
    },
    subSection: {
      textAlign: "center",
      marginLeft: "100px",
    },
    subTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
      textAlign: "center",
      marginRight: "200px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <div style={styles.textBlock}>
          <h1 style={styles.title}>
            Revamp your living space with stunning furniture pieces and your style
          </h1>
          <p style={styles.paragraph}>
            Furniture plays an essential role in creating exceptional environments, whether
            it's a building, community, or place. At our practice, we understand the
            importance of thoughtful and innovative furniture solutions that complement the
            unique historic or natural environment of a space.
          </p>
        </div>
        <img
          src={choose_material}
          alt="Furniture materials"
          style={styles.image}
        />
      </div>

      {/* Sub Section */}
      <div style={styles.subSection}>
        <h2 style={styles.subTitle}>Choose your material for your furniture</h2>
        <p style={styles.paragraph}>
          Furniture materials play a critical role in determining the overall look, feel,
          and durability of any furniture piece. There are a wide variety of materials
          available, each with its unique properties and based on their intended use, the
          desired style.
        </p>
      </div>
    </div>
  );
}

export default App;

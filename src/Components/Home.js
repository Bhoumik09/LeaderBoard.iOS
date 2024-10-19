import React, { useEffect, useState } from 'react';

function Home() {
  const [teamScores, setTeamScores] = useState({});
  const [sortedObject, setSortedObject] = useState({});

  const teamNameList = [
    "Alpha One", "Meth", "Team Sahil", "Bombastic", "BingeWatch", 
    "Non-Metallica", "Fukrey", "LiLiLarks", "Team DCP", "Team JNL",
    "BACKSHOTS", "THE JIGSAW's", "Quad Squad", "ALPHA Q", 
    "Discarded Retardeds", "Trackers", "VIT Falcons", "Nexus", 
    "Deadpool", "Unaborted 4", "Winners", "Knee grow", 
    "NoShitSherlock", "Pesa", "Momo", "Hustlers", "Clueless", 
    "Diamond 1", "Knightmares", "Teen Titans", "Team Kryptonite", 
    "Niggamons", "Valhalla", "Team Hell", "Gang314", "POTASS", 
    "Insidious"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (let index = 0; index < teamNameList.length; index++) {
        const teamName = teamNameList[index];
        await fetch("https://api.counterapi.dev/v1/round1_GameFlix20/" + teamName)
          .then((res) => res.json())
          .then((res) => {
            data[teamName] = res.code === 400 ? 0 : res.count;
          })
          .catch(() => {
            data[teamName] = 0; // Set score to 0 if there's an error
          });
      }
      setTeamScores(data);
    };

    fetchData();

    const timer = setInterval(() => {
      fetchData();
    }, 30000); // refresh every 30 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const sortedArray = Object.entries(teamScores).sort((a, b) => b[1] - a[1]);
    const sortedObject = Object.fromEntries(sortedArray);
    setSortedObject(sortedObject);
  }, [teamScores]);
  const getAccentColor = (index) => {
    const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#4169E1', '#32CD32', '#FF69B4', '#9370DB', '#00CED1'];
    return colors[index % colors.length];
  };
  return (
    <div style={{ fontFamily: 'PT Sans, sans-serif', color: '#333', backgroundColor: '#f4f7fc', minHeight: '100vh', width:'100vw' }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rebeccapurple' }}>
        <div className="container">
          <a href="/" className="navbar-brand" style={{ color: "#fff", fontWeight: 'bold' }}>
            <img src='./images/clublogo.png' style={{ height: "40px", width: "170px" }} alt="Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link text-white">Home</a></li>
              <li className="nav-item"><a className="nav-link text-white">About</a></li>
              <li className="nav-item"><a className="nav-link text-white">Contact</a></li>
              <li className="nav-item"><a className="nav-link text-white">Support</a></li>
            </ul>
            <button className="btn btn-primary" style={{ backgroundColor: '#fff', color: '#65A0FB', borderRadius: '20px' }}>Leaderboard</button>
          </div>
        </div>
      </nav>
      
      {/* Leaderboard Section */}
      <div style={{ margin: '0 auto', padding: '2rem' , backgroundColor:'black', minHeight:'100vh'}}>
        <h2 style={{ textAlign: 'center', color: '#ffffff', marginBottom: '2rem', fontSize: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Leaderboard</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem',placeItems:'center'  }}>
          {Object.entries(sortedObject).map(([teamName, score], index) => (
            <div key={teamName} style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '10px',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              border: '1px solid #333',
              position: 'relative',
              width:'17rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = `0 0 20px ${getAccentColor(index)}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              <div style={{
                backgroundColor: '#000000',
                color: getAccentColor(index),
                padding: '1rem',
                textAlign: 'center',
                fontSize: '2rem',
                fontWeight: 'bold',
                borderBottom: `2px solid ${getAccentColor(index)}`
                
              }}>
                #{index + 1}
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.2rem', fontWeight: 'bold', color: '#ffffff' }}>{teamName}</h3>
                <p style={{ 
                  margin: '0', 
                  fontSize: '1.8rem', 
                  fontWeight: 'bold', 
                  color: getAccentColor(index),
                  textAlign: 'right',
                  position: 'absolute',
                  bottom: '1rem',
                  right: '1rem',
                }}>
                  {score}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

import React, { useEffect, useState } from 'react';

const tabs = ['posts', 'comments', 'albums'];
function Content() {
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState('posts');

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  const [showGoToTop, setShowGoToTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoToTop(true);
        // console.log('scrolled');
      } else {
        setShowGoToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    console.log('addEventListener');
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('removeEventListener');
    };
  }, []);

  return (
    <div>
      {showGoToTop && (
        <button style={{ position: 'fixed', right: 20, bottom: 20 }}>
          Go Top Top
        </button>
      )}
      {tabs.map((tab) => (
        <button
          key={tab}
          style={type === tab ? { color: '#fff', backgroundColor: '#333' } : {}}
          onClick={() => setType(tab)}
        >
          {tab}
        </button>
      ))}
      {/* <input value={title} onChange={(e) => setTitle(e.target.value)} /> */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title || post.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Content;

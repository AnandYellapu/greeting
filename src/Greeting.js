import React, { useState, useEffect } from 'react';
import { Box, Typography, Slide } from '@mui/material';
import anime from 'animejs';
import { motion } from 'framer-motion';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PetsIcon from '@mui/icons-material/Pets';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';

const colors = ['#007BFF', '#FFC107', '#28A745', '#DC3545', '#6610f2', '#17a2b8', '#FF5733', '#C70039', '#900C3F'];
const icons = [
  <FavoriteIcon fontSize="large" />,
  <StarIcon fontSize="large" />,
  <EmojiEmotionsIcon fontSize="large" />,
  <ChildCareIcon fontSize="large" />,
  <PetsIcon fontSize="large" />,
  <SentimentVerySatisfiedIcon fontSize="large" />,
  <WhatshotIcon fontSize="large" />,
  <ThumbUpIcon fontSize="large" />,
  <EmojiNatureIcon fontSize="large" />
];

const Greeting = () => {
  const [currentName, setCurrentName] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);
  const [slideIn, setSlideIn] = useState(true);

  const names = ['Bangaram', 'Baby', 'Mardala', 'Rakshashi', 'Bujji', 'Kanna','Picchi'];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < names.length) {
        setCurrentName(names[index]);
        setSlideIn(false); // Trigger slide out
        setTimeout(() => {
          setSlideIn(true); // Trigger slide in
        }, 500); // Delay for slide out animation
        index++;
      } else {
        clearInterval(interval);
        setShowGreeting(true);
        setTimeout(() => {
          anime({
            targets: '.line-drawing-demo .lines path',
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            duration: 1500,
            delay: function (el, i) { return i * 250 },
            direction: 'alternate',
            loop: true
          });
        }, 500); // Delay to ensure the text is fully rendered before animation starts
      }
    }, 2000); // Change name every 2 seconds

    return () => clearInterval(interval);
  }, []);     //eslint-disable-line 

  useEffect(() => {
    anime({
      targets: '.animated-name',
      translateX: function (el) {
        return el.getAttribute('data-x');
      },
      translateY: function (el, i) {
        return 50 + (-50 * i);
      },
      scale: function (el, i, l) {
        return (l - i) + .25;
      },
      rotate: function () { return anime.random(-360, 360); },
      borderRadius: function () { return ['50%', anime.random(10, 35) + '%']; },
      duration: function () { return anime.random(1200, 1800); },
      delay: function () { return anime.random(0, 400); },
      direction: 'alternate',
      loop: true
    });
  }, [currentName]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background: 'linear-gradient(to right, #4776E6, #8E54E9)',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        flexDirection: 'column',
        gap: 4
      }}
    >
      <Slide direction="up" in={slideIn} mountOnEnter unmountOnExit>
        <Box display="flex" alignItems="center" gap={2}>
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ color: colors[names.indexOf(currentName) % colors.length] }}
          >
            {icons[names.indexOf(currentName) % icons.length]}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Typography
              className={`animated-name ${showGreeting ? 'line-drawing-demo' : ''}`}
              data-x="100"
              variant={showGreeting ? "h1" : "h2"}
              sx={{
                fontSize: showGreeting ? '64px' : '48px',
                color: showGreeting ? '#DC3545' : 'transparent',
                background: showGreeting ? '' : `linear-gradient(45deg, ${colors.join(', ')})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                transition: 'color 0.3s ease',
                borderRadius: '8px',
                padding: '20px 40px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {showGreeting ? 'Satya Bangaram I Love You' : currentName}
            </Typography>
          </motion.div>
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ color: colors[names.indexOf(currentName) % colors.length] }}
          >
            {icons[names.indexOf(currentName) % icons.length]}
          </motion.div>
        </Box>
      </Slide>
    </Box>
  );
};

export default Greeting;

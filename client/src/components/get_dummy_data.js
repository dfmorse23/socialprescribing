import React from 'react';

export default function get_dummy_data() {

  const volunteering = [
    {
      title: 'Grant Writer Volunteer',
      url: 'https://www.volunteermatch.org/search/opp3282501.jsp',
      tag: 'volunteering',
      image: 'https://source.unsplash.com/random/?sig=200',
    },
    {
      title: 'Healing Garden',
      url: 'https://www.volunteermatch.org/search/opp3369937.jsp',
      tag: 'volunteering',
      image: 'https://source.unsplash.com/random/?sig=201',
    },
    {
      title: 'Receptionist at Health Care Clinic',
      url: 'https://www.volunteermatch.org/search/opp3353712.jsp',
      tag: 'volunteering',
      image: 'https://source.unsplash.com/random/?sig=202',
    },
    {
      title: 'Virtual Newcomer Youth Mentor',
      url: 'https://www.volunteermatch.org/search/opp3378329.jsp',
      tag: 'volunteering',
      image: 'https://source.unsplash.com/random/?sig=203',
    },
    {
      title: 'Human Resources Specialist',
      url: 'https://www.volunteermatch.org/search/opp3386018.jsp',
      tag: 'volunteering',
      image: 'https://source.unsplash.com/random/?sig=204',
    },
    {
      title: 'Writer',
      url: 'https://www.volunteermatch.org/search/opp3379895.jsp',
      tag: 'volunteering',
      image: 'https://source.unsplash.com/random/?sig=205',
    }
  ];

  const temp = [{
    title: 'Reddit',
    url: 'https://www.reddit.com/r/legaladvice',
    tag: 'legal',
    image: 'https://source.unsplash.com/random',
  },
  {
    title: 'Find it yourself',
    url: 'https://google.ca',
    tag: 'outdoors',
    image: 'https://source.unsplash.com/random',
  },];

  const data = [...volunteering, ...temp]

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }


  return data
}
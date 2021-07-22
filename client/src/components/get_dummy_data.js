export default function get_dummy_data() {

  const volunteering = [
    {
      title: 'Grant Writer Volunteer',
      url: 'https://www.volunteermatch.org/search/opp3282501.jsp',
      tag: 'Volunteering',
      image: 'https://source.unsplash.com/random/?volunteering,write,sig=200',
    },
    {
      title: 'Healing Garden Caretaker',
      url: 'https://www.volunteermatch.org/search/opp3369937.jsp',
      tag: 'Volunteering',
      image: 'https://source.unsplash.com/random/garden,health,?sig=201',
    },
    {
      title: 'Receptionist at Health Care Clinic',
      url: 'https://www.volunteermatch.org/search/opp3353712.jsp',
      tag: 'Volunteering',
      image: 'https://source.unsplash.com/random/?office,receptionist,sig=202',
    },
    {
      title: 'Virtual Newcomer Youth Mentor',
      url: 'https://www.volunteermatch.org/search/opp3378329.jsp',
      tag: 'Volunteering',
      image: 'https://source.unsplash.com/random/youth,menetor,?sig=203',
    },
    {
      title: 'Human Resources Specialist',
      url: 'https://www.volunteermatch.org/search/opp3386018.jsp',
      tag: 'Volunteering',
      image: 'https://source.unsplash.com/random/?human,resources,sig=204',
    },
    {
      title: 'Writer',
      url: 'https://www.volunteermatch.org/search/opp3379895.jsp',
      tag: 'Volunteering',
      image: 'https://source.unsplash.com/random/?writer,words,volunteer,sig=205',
    }
  ];

  const nature = [
    {
      title: 'Wheelchair Friendly Hiking',
      url: 'https://www.alltrails.com/explore/canada/ontario/richmond-hill?b_tl_lat=44.05801379364118&b_tl_lng=-79.77456434332846&b_br_lat=43.628864756176114&b_br_lng=-79.06035213680381&f[]=ada',
      tag: 'Nature',
      image: 'https://source.unsplash.com/random/?nature,hiking,sig=206',
    },
    {
      title: 'Don Valley Parklands',
      url: 'https://foursquare.com/v/don-valley-parklands/4bf86d79b182c9b6f081775a',
      tag: 'Nature',
      image: 'https://source.unsplash.com/random/?park,sig=207',
    },
    {
      title: 'Pavilion Ice Arena',
      url: 'https://foursquare.com/v/pavilion-ice-arena/4ba41570f964a520b37f38e3',
      tag: 'Nature',
      image: 'https://source.unsplash.com/random/?hockey,sig=208',
    },
    {
      title: 'Disc Golf: White Spruce Park',
      url: 'https://udisc.com/courses/white-spruce-park-AiNX',
      tag: 'Nature',
      image: 'https://source.unsplash.com/random/?frisbee,disc+golf,sig=209',
    },
    {
      title: 'Drumming in the Park',
      url: 'https://www.google.com/search?client=firefox-b-d&q=find+evnts+at+parks&ibp=htl;events&rciv=evn&sa=X&ved=2ahUKEwiCx6Tlu_XxAhUMX80KHYDQAz8Q5bwDMAF6BAgQEAE#fpstate=tldetail&htidocid=L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDIxLTA3LTE3fDEyMDA4MjAxNTY2NjA5NjcxNTg1&htivrt=events&mid=/g/11rrq4kmpx&sxsrf=ALeKk03Agiptil_aZrikwkLjKJ1pTEXPPw:1626915302098',
      tag: 'Nature',
      image: 'https://source.unsplash.com/random/?park+drum,sig=210',
    },
  ]

  const food = [
    {
      title: 'Foodies Food Truck Festival Newmarket',
      url: 'https://www.google.com/search?client=firefox-b-d&q=food+events+near+me+&ibp=htl;events&rciv=evn&sa=X&ved=2ahUKEwiMzLGuvPXxAhU5AZ0JHei9BxoQ5bwDMAF6BAgYEAE#fpstate=tldetail&htidocid=L2F1dGhvcml0eS9ob3Jpem9uL2NsdXN0ZXJlZF9ldmVudC8yMDIxLTA3LTI0fDEyNDQzNjMwMzIyODIxMzUxMTg1&htivrt=events&mid=/g/11q83rrkjx&sxsrf=ALeKk01zr9b7KONSeju5Xi2U-6oLmJhJwg:1626915455403',
      tag: 'Food',
      image: 'https://source.unsplash.com/random/?food+truck,sig=211',
    },
    {
      title: 'Graduation Picnic',
      url: 'https://www.eventbrite.com/e/graduation-picnic-tickets-160221018379?aff=ebdssbdestsearch',
      tag: 'Food',
      image: 'https://source.unsplash.com/random/?food,park,sig=212',
    },

    {
      title: 'Caribbean Eats at the Afro-Caribbean Farmers Market',
      url: 'https://www.eventbrite.ca/e/caribbean-eats-at-the-afro-caribbean-farmers-market-tickets-160653040569?aff=ebdssbdestsearch',
      tag: 'Food',
      image: 'https://source.unsplash.com/random/?food,caribbean,farmers+market,sig=213',
    },
    {
      title: 'Lakeview Farmers\' Market',
      url: 'https://www.eventbrite.ca/e/lakeview-farmers-market-tickets-153724711751?aff=ebdssbdestsearch',
      tag: 'Food',
      image: 'https://source.unsplash.com/random/?food,farmers+market,sig=214',
    },
    {
      title: 'Food & Grocery Coupons',
      url: 'https://www.save.ca/coupons/food',
      tag: 'Food',
      image: 'https://source.unsplash.com/random/?food,coupon,sig=215',
    },
  ]

  // const temp = [{
  //   title: 'Reddit',
  //   url: 'https://www.reddit.com/r/legaladvice',
  //   tag: 'legal',
  //   image: 'https://source.unsplash.com/random',
  // },
  // {
  //   title: 'this is a really long post so make sure it doesn\'t go too long',
  //   url: 'https://google.ca',
  //   tag: 'outdoors',
  //   image: 'https://source.unsplash.com/random',
  // },];

  const data = [...volunteering, ...nature, ...food]

  for (let i = data.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [data[i], data[j]] = [data[j], data[i]];
  }


  return data
}
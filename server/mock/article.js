import moment from 'moment';

const articles = [
  {
    id: 5,
    createdOn: moment()
      .format('YYYY-MM-DD HH:mm:ss'),
    category_id: 1,
    title: 'Maecenas volutpat blandit aliquam',
    image: 'https://source.unsplash.com/collection/2186949',
    authorId: 1,
    article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nascetur ridiculus mus mauris vitae ultricies leo integer. Libero nunc consequat interdum varius sit amet mattis vulputate. Cras ornare arcu dui vivamus arcu felis bibendum. Congue quisque egestas diam in arcu cursus euismod. Diam quis enim lobortis scelerisque. Vulputate eu scelerisque felis imperdiet proin fermentum leo. Lobortis mattis aliquam faucibus purus in massa. Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis. Sit amet consectetur adipiscing elit pellentesque habitant. Eget duis at tellus at urna condimentum mattis. Porttitor leo a diam sollicitudin tempor id eu nisl nunc. Et pharetra pharetra massa massa ultricies mi quis. Morbi blandit cursus risus at ultrices mi tempus. Lobortis mattis aliquam faucibus purus in. Viverra nam libero justo laoreet sit amet cursus sit. Augue mauris augue neque gravida. Risus nullam eget felis eget nunc lobortis mattis.\n'
      + '\n'
      + 'Sit amet consectetur adipiscing elit ut aliquam. Imperdiet nulla malesuada pellentesque elit. Quisque egestas diam in arcu cursus euismod quis viverra. At quis risus sed vulputate odio ut. Enim eu turpis egestas pretium aenean pharetra magna. Non consectetur a erat nam. Tincidunt eget nullam non nisi. Eros donec ac odio tempor orci dapibus ultrices. Diam maecenas ultricies mi eget mauris pharetra et ultrices. Ac orci phasellus egestas tellus rutrum tellus pellentesque eu.',
    comments: {},
    tags: [
      {
        id: 2,
        tag: 'tag 2',
      },
    ],
  },
  {
    id: 4,
    createdOn: moment()
      .format('YYYY-MM-DD HH:mm:ss'),
    category_id: 1,
    title: 'Vitae tortor condimentum lacinia',
    image: 'https://source.unsplash.com/collection/2186949',
    authorId: 1,
    article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pharetra magna ac placerat vestibulum lectus mauris ultrices. Enim tortor at auctor urna nunc id cursus. Curabitur vitae nunc sed velit. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Diam volutpat commodo sed egestas egestas fringilla phasellus faucibus. Metus vulputate eu scelerisque felis imperdiet. Consequat id porta nibh venenatis cras sed felis. Enim ut sem viverra aliquet eget sit amet tellus cras. Porttitor massa id neque aliquam vestibulum morbi blandit cursus risus.\n'
      + '\n'
      + 'Amet venenatis urna cursus eget nunc scelerisque viverra. Quis blandit turpis cursus in hac habitasse. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Laoreet suspendisse interdum consectetur libero id. Amet consectetur adipiscing elit pellentesque habitant morbi. Mauris in aliquam sem fringilla ut morbi tincidunt. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Vivamus arcu felis bibendum ut tristique et egestas. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla. Justo laoreet sit amet cursus. Aliquam ultrices sagittis orci a scelerisque purus. A arcu cursus vitae congue. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Pellentesque eu tincidunt tortor aliquam.',
    comments: {},
    tags: [
      {
        id: 1,
        tag: 'tag 1',
      },
      {
        id: 2,
        tag: 'tag 3',
      },
    ],
  },
];

export default articles;
// component
import Iconify from "@/components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name: string) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  // {
  //   title: 'question',
  //   path: '/question',
  //   icon: getIcon('uil:blogger'),
  //   children: [
  //     {
  //       title: 'All Questions',
  //       path: 'questions/allquestions',
  //     },
  //     {
  //       title: 'Add New',
  //       path: '/questions/create',
  //     },
  //   ],
  // },

  // {
  //   title: 'product',
  //   path: 'products',
  //   icon: getIcon('eva:shopping-bag-fill'),
  // },
  {
    title: "blog",
    path: "/blog",
    icon: getIcon("uil:blogger"),
    children: [
      {
        title: "All Posts",
        path: "/blog/posts",
      },
      {
        title: "Add New",
        path: "/blog/create",
      },
    ],
  },
  {
    title: "user",
    path: "user",
    icon: getIcon("eva:people-fill"),
  },
];

export default navConfig;

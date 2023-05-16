// component
import { styled } from "@mui/material/styles";

interface IconSpanProps {
  icon: string;
}

const IconSpan = styled("span")<IconSpanProps>(({ icon }) => {
  return {
    width: "100%",
    height: "100%",
    display: "inline-block",
    backgroundColor: "currentColor",
    WebkitMask: `url(/static/icons/sidebar/${icon}.svg) center center / contain no-repeat`,
  };
});

// ----------------------------------------------------------------------

const getIcon = (icon: string) => <IconSpan icon={icon} />;

const menuConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("ic_dashboard"),
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
    icon: getIcon("ic_blog"),
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
    path: "/user",
    icon: getIcon("ic_user"),
    children: [
      {
        title: "All users",
        path: "/users",
      },
      {
        title: "Add New",
        path: "/user/create",
      },
      {
        title: "Account",
        path: "/user/account",
      },
    ],
  },
];

export default menuConfig;

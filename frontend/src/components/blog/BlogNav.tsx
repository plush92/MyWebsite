import React, { useState } from "react";
import CustomDrawer, {DrawerSizing} from "../materialui/CustomDrawer";
import CustomButton from "../materialui/CustomButton";

const BlogNav: React.FC = () => {
  const [open, setOpen] = useState(false);

  const drawerItems = [
    { label: "Posts", onClick: () => alert("Posts clicked") },
    { label: "Comments", onClick: () => alert("Comments clicked") },
    { label: "Stats", onClick: () => alert("Stats clicked") },
  ];

  return (
    <>
      <CustomButton onClick={() => setOpen(true)}>
        Expand
      </CustomButton>
      <CustomDrawer
              open={open}
              onClose={() => setOpen(false)}
              anchor="left"
              items={drawerItems}
              styleArray={DrawerSizing}
              variant="persistent"
              slotProps={{
                  paper: {
                      sx: { top: '128px', height: 'calc(100% - 128px)' }
                  }
              }}
              
      >
      </CustomDrawer>
    </>
  );
};

export default BlogNav;

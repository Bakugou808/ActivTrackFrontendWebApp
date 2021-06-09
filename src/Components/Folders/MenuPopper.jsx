import React, { useEffect } from "react";

// * Material Ui Imports
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

function MenuPopper(props) {
  const { item, setShowFormEdit, setItem, handleDelete } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  useEffect(() => {
    item && setItem(item);
  }, [item]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleAction = (e) => {
    let action = e.target.id;

    switch (action) {
      case "delete":
        handleDelete(item.id);
        setOpen(false);
        break;
      case "edit":
        setItem(item);
        setShowFormEdit(true);
      default:
        setOpen(false);
    }
  };

  return (
    <div>
      <MoreVertIcon
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      />

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement={"top"}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={handleAction} id="edit">
                    Edit
                  </MenuItem>
                  <MenuItem onClick={handleAction} id="delete">
                    Delete
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

export default MenuPopper;

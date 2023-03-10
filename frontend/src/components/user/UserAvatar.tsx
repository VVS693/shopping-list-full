import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useEffect, useState } from "react";

interface UserAvatarProps {
  userAvatar?: string;
  isUserActive?: boolean;
  width?: number;
  height?: number;
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export function UserAvatar({
  userAvatar,
  isUserActive,
  width,
  height,
}: UserAvatarProps) {
  const [currentUserAvatar, setCurrentUserAvatar] = useState(userAvatar);

  useEffect(() => {
    setCurrentUserAvatar(userAvatar);
  }, [userAvatar]);

  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant={isUserActive ? "dot" : "standard"}
    >
      <Avatar
        sx={{ width: { width }, height: { height } }}
        src={currentUserAvatar ? currentUserAvatar : "default_ava.png"}
        onError={() => {
          setCurrentUserAvatar("default_ava.png");
        }}
      />
    </StyledBadge>
  );
}

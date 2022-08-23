javascript: (() => {
	
	var updatedAdminList = ChatRoomData.Admin.concat(Player.FriendList);	

	updatedAdminList = updatedAdminList.filter((item, index) => {
		return (updatedAdminList.indexOf(item) == index)
	});

	ChatRoomData.Admin = updatedAdminList;

	var UpdatedRoom = {
			Name: ChatRoomData.Name,
			Language: ChatRoomData.Language,
			Description: ChatRoomData.Description,
			Background: ChatRoomData.Background,
			Limit: ChatRoomData.Limit,
			Admin: ChatRoomData.Admin,
			Ban: ChatRoomData.Ban,
			BlockCategory: ChatRoomData.BlockCategory,
			Game: ChatRoomData.Game,
			Private: ChatRoomData.Private,
			Locked: ChatRoomData.Locked
		};
	ServerSend("ChatRoomAdmin", { MemberNumber: Player.ID, Room: UpdatedRoom, Action: "Update" });
	
})();

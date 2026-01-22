interface BCTSettings {
    version: number;
    showChangelog: boolean;
    bctIconOnlyShowOnHover: boolean;

    ItemPerm: string[];

    splitOrgasmArousal: boolean;
    arousalProgressMultiplier: number;
    orgasmProgressMultiplier: number;
    arousalDecayMultiplier: number;
    automaticErectionThreshold: number;
    orgasmDecayMultiplier: number;
    arousalbarLocation: "Bottom" | "Right";

    tailWaggingEnable: boolean;
    tailWaggingTailOneName: string;
    tailWaggingTailOneColor: ItemColor;
    tailWaggingTailTwoName: string;
    tailWaggingTailTwoColor: ItemColor;
    tailWaggingCount: number;
    tailWaggingDelay: number;

    bestFriendsEnabled: boolean;
    bestFriendsRoomShare: boolean;
    bestFriendsList: number[];
    miscShareRoomList: number[];

    friendlistSlotsEnabled: boolean;
}

interface BCTSharedSettings {
    splitOrgasmArousal: never;
    arousalProgressMultiplier: never;
    arousalDecayMultiplier: never;
    orgasmProgressMultiplier: never;
    orgasmDecayMultiplier: never;
    arousalAffectsOrgasmProgress: never;
    bestFriendsEnabled: never;
}

interface BCTConfiguration {
    version: string;
    bctSettings: BCTSettings;
	bctSharedSettings: BCTSharedSettings;
	splitOrgasmArousal: {
        arousalProgress: number;
        arousalZoom: boolean;
        ProgressTimer: number;
        vibrationLevel: number;
        changeTime: number;
    };
}

interface PlayerCharacter {
    BCT: BCTConfiguration;
}

interface Character {
    BCT: BCTConfiguration;
    BCEArousal: boolean;
    BCEArousalProgress: number;
}

interface ItemProperties {
    RemovalTime?: number;
}

declare function ChatRoomCanAddAsBF(): boolean;
declare function ChatRoomCanRemoveAsBF(): boolean;

declare function PreferenceSubscreenBCTArousalLoad();
declare function PreferenceSubscreenBCTArousalRun();
declare function PreferenceSubscreenBCTArousalClick();
declare function PreferenceSubscreenBCTArousalExit();

declare function PreferenceSubscreenBCTTailwagLoad();
declare function PreferenceSubscreenBCTTailwagRun();
declare function PreferenceSubscreenBCTTailwagClick();
declare function PreferenceSubscreenBCTTailwagExit();

declare function PreferenceSubscreenBCTTweaksLoad();
declare function PreferenceSubscreenBCTTweaksRun();
declare function PreferenceSubscreenBCTTweaksClick();
declare function PreferenceSubscreenBCTTweaksExit();

declare function PreferenceSubscreenBCTBestFriendsLoad();
declare function PreferenceSubscreenBCTBestFriendsRun();
declare function PreferenceSubscreenBCTBestFriendsClick();
declare function PreferenceSubscreenBCTBestFriendsExit();

interface BCT_API {
    HintForeColor: string;
    HintBackColor: string;
    HintBorderColor: string;
    ActivityChatRoomBCTArousalSync(Character: C): void;
    ActivitySetBCTArousal(Character: C, Progress: number): void;
    getOrgasmProgressMultiplier(Character: C): number;
    tailWag(): void;
};

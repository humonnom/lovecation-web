export interface UserDetailData {
  descriptions: {
    ko: string;
    ja: string;
  };
  interests: string[];
  languageSkills: {
    korean?: number;
    japanese?: number;
    english?: number;
  };
  culturalPreferences: {
    JP?: {
      food: number;
      entertainment: number;
      culture: number;
    };
    KR?: {
      food: number;
      entertainment: number;
      culture: number;
    };
  };
  lifestyle: {
    drinking?: string;
    smoking?: string;
    exercise?: string;
    pet?: string;
  };
  futurePlans: {
    JP?: string[];
    KR?: string[];
  };
  idealType: {
    ageRange: string;
    personality: string;
    dateStyle: string;
  };
}

export type UserDetailDataMap = Record<string, UserDetailData>;

import {
    adminAssistance,
    ceacd,
    communityAndPeerSupport,
    initialAssesmentAndCounseling,
    postExamFolloUp,
    resourceProvision,
    structuredStudyPlan,
    supportServices,
    trainingAndReviewCourses,
    tutoringAndMentoring,

    trainingAndReviewCourseHover,
    customizedJobMatchingHover,
    employerEngagementHover,
    followUpContinousSupportHover,
    initialAssesmentHover,
    interviewPreparationHover,
    postPlacementSupportHover,
    salaryNegotiationAndBenefitsHover,
    supportServicesHover,
    resumeAndCoverLetterHover,

    nclex,
    nclexText,
    nclexHover,
    immigration,
    immigrationHover,
    immigrationText,
    ielts,
    ieltsHover,
    ieltsText,
    placementsText,
    placements,
    placementsHover,
    benefits,
    benefitsHover,
    benefitsText,
    network,
    networkHover,
    networkText,

    homeBenefits,
    homeCompensation,
    homeIelts,
    homeImmigration,
    homeNclex,
    homePlacement,

} from "../assets/homePageButton";

export const homePageOption = [
    {
        id: "content1",
        src: initialAssesmentAndCounseling,
        srcHover: initialAssesmentHover,
    },
    {
        id: "content2",
        src: resourceProvision,
        srcHover: resumeAndCoverLetterHover,
    },
    {
        id: "content3",
        src: structuredStudyPlan,
        srcHover: interviewPreparationHover,
    },
    {
        id: "content4",
        src: trainingAndReviewCourses,
        srcHover: trainingAndReviewCourseHover,
    },
    {
        id: "content5",
        src: tutoringAndMentoring,
        srcHover: customizedJobMatchingHover,
    },
    {
        id: "content6",
        src: supportServices,
        srcHover: employerEngagementHover,
    },
    {
        id: "content7",
        src: adminAssistance,
        srcHover: supportServicesHover,
    },
    {
        id: "content8",
        src: postExamFolloUp,
        srcHover: followUpContinousSupportHover,
    },
    {
        id: "content9",
        src: ceacd,
        srcHover: postPlacementSupportHover,
    },
    {
        id: "content10",
        src: communityAndPeerSupport,
        srcHover: salaryNegotiationAndBenefitsHover,
    },
];

export const OurServicesSources = [
    {
        id: 'service1',
        imgText: nclexText,
        imgSrc: nclex,
        imgSrcHover: nclexHover,
    },
    {
        id: 'service2',
        imgText: immigrationText,
        imgSrc: immigration,
        imgSrcHover: immigrationHover,
    },
    {
        id: 'service3',
        imgText: ieltsText,
        imgSrc: ielts,
        imgSrcHover: ieltsHover,
    },
    {
        id: 'service4',
        imgText: placementsText,
        imgSrc: placements,
        imgSrcHover: placementsHover,
    },
    {
        id: 'service5',
        imgText: benefitsText,
        imgSrc: benefits,
        imgSrcHover: benefitsHover,
    },
    {
        id: 'service6',
        imgText: networkText,
        imgSrc: network,
        imgSrcHover: networkHover,
    },
];

export const homeOurServiceContent = [ 
    {
        id: "homeService1",
        imgSrc: homeNclex,
        imgSrcHover: nclexHover,
    },
    {
        id: "homeService2",
        imgSrc: homeIelts,
        imgSrcHover: ieltsHover,
    },
    {
        id: "homeService3",
        imgSrc: homeBenefits,
        imgSrcHover: benefitsHover,
    },
    {
        id: "homeService4",
        imgSrc: homePlacement,
        imgSrcHover: placementsHover,
    },
    {
        id: "homeService5",
        imgSrc: homeCompensation,
        imgSrcHover: networkHover,
    },
    {
        id: "homeService6",

        imgSrc: homeImmigration,
        imgSrcHover: immigrationHover,
    },

]

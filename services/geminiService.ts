import { Industry, GenerationResult, LanguageCode, DialectCode, EmojiLevel, CaptionVariation } from "../types";
import { GoogleGenAI, Type } from "@google/genai";

/**
 * DICELION OFFLINE DATABASE (v2.0)
 * Massive dataset for high-converting Ad Templates to ensure 100% Offline-First Architecture.
 */
const OFFLINE_TEMPLATE_DB: Record<string, any> = {
  "ar": {
    "moroccan": {
      "v1": [
        "إلى كنتي كتقلب على {product} فمستوى عالي وكتحلم بالتميز الحقيقي، جيتي للمكان الصحيح لي غايهنيك من كاع المشاكل ديال الجودة والشك. {details}. الجودة والضمان هو شعارنا الأول لي مكنتنازلوش عليه أبداً، وحنا هنا اليوم باش نضمنو ليك أحسن تجربة شرائية ممكنة بمواصفات ملكية كتلبي كاع الاحتياجات والانتظارات ديالك بكل احترافية.",
        "الهمزة الحقيقية هي لي كتجمع بين الجودة والثمن، وهاد {product} هو البرهان. {details}. حنا فـ {industry} عارفين شنو كتحتاج، داكشي علاش جبنا ليك هاد العرض الحصري لي مكيتحطش ديما. اتقان في الصنع وجمالية في المنظر، هادشي كامل باش تكون راضي 100% وتعاود ترجع عندنا بابتسامة.",
      ],
      "v2": [
        "التميز هو سر النجاح الحقيقي فالسوق اليوم، وحنا فخورين باش نقدمو ليك {product} بمواصفات عالمية كتحترم المعايير الدولية: {details}. خدمتنا مكاتوقفش غير فالمبيع، بل حنا معاك فكل خطوة باش نضمنو ليك الرضا التام والراحة النفسية. التوصيل متوفر لجميع المدن المغربية والدفع كيكون حتال لباب الدار من بعد ما كتشوف السلعة وتأكد من الجودة ديالها بنفسك وتقتنع 100%. هاد العرض حصري ومحدود بزاف، داكشي علاش خاصك تستغل الفرصة دابا قبل ما يسالي المخزون لي عندنا وتندم. هدفنا الأساسي هو نبنيو جسر ديال الثقة المتين بيننا وبين الزبائن ديالنا الأوفياء، وهاد السلعة هي البرهان القاطع على أن الإتقان والصدق هما الساس ديالنا فكل تعامل. ماترددش تواصل معانا دابا فالحين باش تعرف كاع التفاصيل وتستفد من هاد الهمزة لي مكتحطش ديما فالسوق.",
        "بغيتي تطلع النيفو فخدمتك أو حياتك؟ {product} هو الحل لي كنتي كتسناه من شحال هادي. {details}. حنا فـ {industry} كنركزو على التفاصيل الدقيقة لي كتدير الفرق الكبير. من اليوم مابقيتيش غاتحتاج تقلب بزاف، حيت وفرنا ليك كاع الضمانات لي كتحميك كزبون vip. السلعة عندنا كتمتاز بالصلابة والأناقة في نفس الوقت، وهي موجهة للناس لي كيعرفو قيمة الحاجة المزيانة. تعاملنا شفاف وواضح، والهدف ديالنا هو نكبرو العائلة ديالنا من الزبائن الراضيين لي كيشهدو بالاحترافية ديالنا. هاد العرض كيشمل توصيل سريع وآمن لعنوانك، مع امكانية المعاينة قبل الاداء لضمان المصداقية التامة. سارع بالطلب دابا وكن من السباقين لامتلاك هاد القطعة النادرة.",
      ]
    }
  },
  "en": {
    "standard": {
      "v1": [
        "Looking for the absolute best in {product}? You have finally reached the pinnacle of excellence and professional quality. We deeply understand your needs for durability and high performance. {details}. Our commitment to customer satisfaction is reflected in every single detail we provide. Join our elite circle of satisfied customers today.",
      ],
      "v2": [
        "In today's fast-paced competitive landscape, only those who invest in true brilliance and engineering mastery stand out from the crowd. We are incredibly proud to present {product}, a product specifically designed to exceed every global industry standard. {details}. This is more than just a simple purchase; it is a strategic investment in your lifestyle or business success. We provide comprehensive, white-glove support from the very moment you inquire until you are fully satisfied with your acquisition. Worldwide shipping options are available with full tracking to ensure your total peace of mind throughout the process. Reach out today.",
      ]
    }
  }
};

/**
 * خوارزمية التوزيع الذكي المحلي للإيموجيات
 * Smart Local Keyword-Based Emoji Injector
 */
const localSmartEmojiInjector = (text: string): string => {
  const keywords: Record<string, string[]> = {
    "✅": ["ضمان", "توصيل", "حقيقي", "متوفر", "جودة", "guaranteed", "quality", "available", "authentic"],
    "🚀": ["بسرعة", "دابا", "عاجل", "انطلق", "fast", "now", "launch", "hurry"],
    "💎": ["همزة", "هوتة", "نادرة", "فخامة", "نادر", "premium", "luxury", "rare", "gem"],
    "🔥": ["تخفيض", "عرض", "حرق", "قوي", "hot", "offer", "sale", "massive"],
    "🎯": ["هدفك", "الحل", "مناسب", "target", "solution", "perfect"],
    "👑": ["ملك", "برستيج", "أفضل", "أول", "king", "prestige", "best", "elite"],
    "✨": ["جديد", "سحر", "تألق", "new", "magic", "shine", "sparkle"]
  };

  let modifiedText = text;
  Object.entries(keywords).forEach(([emoji, words]) => {
    words.forEach(word => {
      const regex = new RegExp(`(${word})`, 'gi');
      modifiedText = modifiedText.replace(regex, `${emoji} $1`);
    });
  });

  if (!modifiedText.includes("🔥") && !modifiedText.includes("🚀")) {
    modifiedText += " 🔥🚀";
  }
  
  return modifiedText;
};

/**
 * Smart Emoji Boosting using Gemini AI
 */
export const boostEmojisWithAI = async (variation: CaptionVariation, langName: string): Promise<CaptionVariation> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Task: Intelligently insert premium emojis into this marketing copy.
    Emojis to use: ✅, ✨, 👑, 🎯, 💎, 🔥, 🚀.
    Rules: 
    1. Do NOT just append at the end. 
    2. Place them next to relevant keywords (e.g., ✅ next to guarantee, 💎 next to quality).
    3. Maintain the professional prestige tone.
    4. Return the result in the exact same JSON structure.
    
    Original Content:
    Headline: ${variation.headline}
    Body: ${variation.body}
    CTA: ${variation.cta}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            headline: { type: Type.STRING },
            body: { type: Type.STRING },
            cta: { type: Type.STRING }
          },
          required: ["headline", "body", "cta"]
        }
      }
    });

    const boosted = JSON.parse(response.text || "{}");
    return {
      ...variation,
      headline: boosted.headline || variation.headline,
      body: boosted.body || variation.body,
      cta: boosted.cta || variation.cta
    };
  } catch (error) {
    console.error("Smart Emoji Boost failed, using local engine:", error);
    return {
      ...variation,
      headline: localSmartEmojiInjector(variation.headline),
      body: localSmartEmojiInjector(variation.body),
      cta: localSmartEmojiInjector(variation.cta)
    };
  }
};

/**
 * محرك التوليد المحلي - Offline Prestige Engine (Powered by OFFLINE_TEMPLATE_DB)
 */
const localPrestigeGenerator = (
  productName: string,
  extraInfo: string,
  industry: Industry,
  langCode: LanguageCode,
  emojiLevel: EmojiLevel,
  dialectCode?: DialectCode
): GenerationResult => {
  
  const getEmojis = (level: EmojiLevel) => {
    const sets = {
      official: { start: "", end: "", mid: "" },
      light: { start: "✨ ", end: " ✅", mid: " 🎯" },
      balanced: { start: "💎 ", end: " 🔥🚀", mid: " 👑" },
      radiant: { start: "🔥🔥🔥🔥 ", end: " 🚀🚀🚀 ✅✅", mid: " 💎💎💎" }
    };
    return sets[level] || sets.balanced;
  };

  const e = getEmojis(emojiLevel);
  const isVideoRequest = productName.toLowerCase().includes('فيديو') || productName.toLowerCase().includes('video') || extraInfo.toLowerCase().includes('سيناريو');

  if (isVideoRequest) {
    return {
      isUpsell: true,
      upsellMessage: langCode === 'ar' 
        ? "خدمة صناعة الفيديوهات الإعلانية الاحترافية هي خدمة حصرية ويتم هندستها بشكل خاص. المرجو التواصل معنا مباشرة لطلبها."
        : "Professional marketing video services are exclusive. Please contact us directly for a custom quote."
    };
  }

  const variations: CaptionVariation[] = [];
  const langKey = langCode === 'ar' ? 'ar' : 'en';
  const dialectKey = (langCode === 'ar' && dialectCode === 'moroccan') ? 'moroccan' : 'standard';
  
  const templates = OFFLINE_TEMPLATE_DB[langKey][dialectKey];

  // Helper to replace placeholders and inject emojis
  const formatText = (text: string) => {
    let formatted = text
      .replace(/{product}/g, productName)
      .replace(/{details}/g, extraInfo)
      .replace(/{industry}/g, industry);
    return localSmartEmojiInjector(formatted);
  };

  // Generate 2 variations using the DB
  variations.push({
    title: langCode === 'ar' ? "خيار الهمزة الخاطف (Offline)" : "Prestige Catchy Choice (Offline)",
    headline: formatText(`${e.start}${productName} - جودة ملكية بأحسن ثمن!${e.mid}`),
    body: formatText(templates.v1[Math.floor(Math.random() * templates.v1.length)]),
    cta: formatText(langCode === 'ar' ? `طلب دابا قبل ما يسالي الستوك!${e.end}` : `Order Now & Secure Yours!${e.end}`),
    hashtags: langCode === 'ar' ? "#المغرب #همزة #جودة #تجارة #عرض_خاص" : "#Premium #Quality #Success #SpecialOffer"
  });

  variations.push({
    title: langCode === 'ar' ? "العرض المفصل (Offline)" : "Detailed Professional Option (Offline)",
    headline: formatText(`${e.start}ارتقِ بمشروعك مع ${productName}${e.mid}`),
    body: formatText(templates.v2[Math.floor(Math.random() * templates.v2.length)]),
    cta: formatText(langCode === 'ar' ? `تواصل معنا دابا على الخاص للمزيد من المعلومات${e.end}` : `Contact our experts for details${e.end}`),
    hashtags: langCode === 'ar' ? "#احترافية #مشاريع #جودة_عالية #تخفيضات" : "#Innovation #Industry #Elite #LimitedEdition"
  });

  return { isUpsell: false, variations };
};

export const generateCaptions = async (
  productName: string,
  extraInfo: string,
  industry: Industry,
  langCode: LanguageCode,
  langName: string,
  emojiLevel: EmojiLevel,
  dialectCode?: DialectCode,
  dialectName?: string
): Promise<GenerationResult> => {
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const isVideoRequest = productName.toLowerCase().includes('فيديو') || productName.toLowerCase().includes('video') || extraInfo.toLowerCase().includes('سيناريو');
    if (isVideoRequest) {
      return {
        isUpsell: true,
        upsellMessage: langCode === 'ar' 
          ? "خدمة صناعة الفيديوهات الإعلانية الاحترافية هي خدمة حصرية ويتم هندستها بشكل خاص. المرجو التواصل معنا مباشرة لطلبها."
          : "Professional marketing video services are exclusive. Please contact us directly for a custom quote."
      };
    }

    const systemInstruction = `### ROLE:
EXPERT AI BACKEND ENGINE specializing in high-converting prestige marketing copy.
OWNED BY: DicelionTechnique © 2001-2026.

### STRICT COMPLIANCE PROTOCOL:

1. DOMAIN PROCESSING:
   - Industry context: ${industry}.
   - CRITICAL: Never print the literal industry name in the captions. Use domain-specific terminology (e.g., if industry is 'Real Estate', use 'Apartment', 'Residence', 'Home' instead of the word 'Real Estate').

2. ANTI-HALLUCINATION & ANTI-REPETITION:
   - ZERO tolerance for generic placeholders.
   - BANNED PHRASES: "Looking for high-level phones?", "Welcome to our industry".
   - If user input is ambiguous, generate a "Teaser/Mystery" ad focused on curiosity.

3. LANGUAGE & DIALECT:
   - Language: ${langName}.
   - Dialect: ${dialectName || 'Standard'}.
   - If Arabic (Moroccan), use AUTHENTIC Business Casual Darija. NO Fusha.

4. CHARACTER CONSTRAINTS:
   - Variation 1 Body: EXACTLY 250-300 characters.
   - Variation 2 Body: EXACTLY 500-750 characters.

5. OUTPUT SCHEMA:
   Pure JSON array of 2 objects. No intro/outro text.
   {
     "title": "Variation Title",
     "headline": "Short Catchy Hook",
     "body": "Detailed Ad Copy (Strict Lengths)",
     "cta": "Clear Call to Action",
     "hashtags": "Premium Hashtags"
   }`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 2 high-prestige marketing variations for:
      Product: ${productName}
      Details: ${extraInfo}
      Target: ${dialectName || langName} speakers.`,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              headline: { type: Type.STRING },
              body: { type: Type.STRING },
              cta: { type: Type.STRING },
              hashtags: { type: Type.STRING }
            },
            required: ["title", "headline", "body", "cta", "hashtags"]
          }
        }
      }
    });

    const variations = JSON.parse(response.text || "[]");
    return { isUpsell: false, variations: variations as CaptionVariation[] };

  } catch (error) {
    // Fallback to the Offline-First Dataset
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = localPrestigeGenerator(productName, extraInfo, industry, langCode, emojiLevel, dialectCode);
        resolve(result);
      }, 500);
    });
  }
};

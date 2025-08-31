import { EmailResult } from '../types/email';

export async function checkEmail(email: string): Promise<EmailResult> {
  try {
    // 1. First API: YChecker
    const ycheckerUrl = `https://ychecker.com/app/payload?email=${encodeURIComponent(email)}&use_credit_first=0`;
    const ycheckerRes = await fetch(ycheckerUrl);
    const ycheckerData = await ycheckerRes.json();

    const payload = ycheckerData.items;
    if (!payload) {
      throw new Error("Failed to fetch payload from YChecker");
    }

    // 2. Second API: Sonjj
    const sonjjUrl = `https://api.sonjj.com/v1/check_email/?payload=${encodeURIComponent(payload)}`;
    const sonjjRes = await fetch(sonjjUrl);
    const sonjjData = await sonjjRes.json();

    // 3. Merge results
    const finalResult: EmailResult = {
      ychecker: ycheckerData,
      sonjj: sonjjData,
    };

    return finalResult;
  } catch (error) {
    return { error: (error as Error).message };
  }
}
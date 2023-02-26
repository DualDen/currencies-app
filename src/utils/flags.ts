import ru from "../assets/flags/ru.svg";
import us from "../assets/flags/us.svg";
import cn from "../assets/flags/cn.svg";
import kr from "../assets/flags/kr.svg";
import jp from "../assets/flags/jp.svg";
import eu from "../assets/flags/eu.svg";
import kz from "../assets/flags/kz.svg";

export const flags: IFlags = {
  RUB: ru,
  USD: us,
  JPY: jp,
  KZT: kz,
  CNY: cn,
  EUR: eu,
  KRW: kr,
};

export interface IFlags {
  RUB: string;
  USD: string;
  JPY: string;
  KZT: string;
  CNY: string;
  EUR: string;
  KRW: string;
}

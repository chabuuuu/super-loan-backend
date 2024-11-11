import { ClientInfoDto } from '@/dto/client-info.dto';
import { Request } from 'express';
import geoip from 'geoip-lite';
import useragent from 'useragent';

export async function getClientInfo(req: Request): Promise<ClientInfoDto> {
  const ipAddress = req.headers['x-forwarded-for'] || req.ip;
  const agent = useragent.parse(req.headers['user-agent']);

  const result = new ClientInfoDto();

  if (agent) {
    result.browser = agent.toAgent();
    result.device = agent.device.toString();
    result.os = agent.os.toString();
  }

  if (ipAddress) {
    const geo = geoip.lookup(ipAddress.toString());

    if (geo) {
      result.country = geo?.country || '';
      result.region = geo?.region || '';
      result.city = geo?.city || '';
      result.timezone = geo?.timezone || '';
    }
  }

  return result;
}

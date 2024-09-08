export interface IOptionTruncate {
  length: number
}

export const truncate = (content: string, option: IOptionTruncate) => {
  return content.length > option.length? `${content.slice(0, option.length)}...` : content
}
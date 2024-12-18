import fs from 'fs';
import { NextResponse } from "next/server";

export async function GET() {
    try {
      // const filePath = '/app/config.json';
      const filePath = './config.json';
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(fileContents);
  
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error leyendo el archivo' }, { status: 500 });
    }
  }
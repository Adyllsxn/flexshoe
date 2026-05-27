import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import type { Request } from 'express';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  private getSessionId(req: Request): string {
    let sessionId = req.cookies?.cart_session;
    if (!sessionId) {
      const crypto = require('crypto');
      sessionId = crypto.randomBytes(32).toString('hex');
    }
    return sessionId;
  }

  @Get()
  @ApiOperation({ summary: 'Ver carrinho' })
  @ApiResponse({ status: 200, description: 'Carrinho retornado com sucesso' })
  async getCart(@Req() req: Request) {
    const sessionId = this.getSessionId(req);
    const cart = await this.cartService.getCart(sessionId);
    const summary = await this.cartService.getCartSummary(sessionId);
    
    return {
      cart,
      summary,
    };
  }

  @Post('add')
  @ApiOperation({ summary: 'Adicionar item ao carrinho' })
  @ApiResponse({ status: 200, description: 'Item adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Estoque insuficiente' })
  async addToCart(@Req() req: Request, @Body() addToCartDto: AddToCartDto) {
    const sessionId = this.getSessionId(req);
    const cart = await this.cartService.addItem(sessionId, addToCartDto);
    const summary = await this.cartService.getCartSummary(sessionId);
    
    return {
      message: 'Item adicionado ao carrinho',
      cart,
      summary,
    };
  }

  @Patch('item/:itemId')
  @ApiOperation({ summary: 'Atualizar quantidade de item' })
  @ApiResponse({ status: 200, description: 'Quantidade atualizada' })
  async updateItemQuantity(
    @Req() req: Request,
    @Param('itemId') itemId: string,
    @Body() updateDto: UpdateCartItemDto,
  ) {
    const sessionId = this.getSessionId(req);
    const cart = await this.cartService.updateItemQuantity(sessionId, itemId, updateDto);
    const summary = await this.cartService.getCartSummary(sessionId);
    
    return {
      message: 'Quantidade atualizada',
      cart,
      summary,
    };
  }

  @Delete('item/:itemId')
  @ApiOperation({ summary: 'Remover item do carrinho' })
  @ApiResponse({ status: 200, description: 'Item removido' })
  async removeItem(@Req() req: Request, @Param('itemId') itemId: string) {
    const sessionId = this.getSessionId(req);
    const cart = await this.cartService.removeItem(sessionId, itemId);
    const summary = await this.cartService.getCartSummary(sessionId);
    
    return {
      message: 'Item removido do carrinho',
      cart,
      summary,
    };
  }

  @Delete('clear')
  @ApiOperation({ summary: 'Limpar carrinho' })
  @ApiResponse({ status: 200, description: 'Carrinho limpo' })
  async clearCart(@Req() req: Request) {
    const sessionId = this.getSessionId(req);
    await this.cartService.clearCart(sessionId);
    
    return {
      message: 'Carrinho limpo com sucesso',
    };
  }

  @Get('summary')
  @ApiOperation({ summary: 'Resumo do carrinho' })
  @ApiResponse({ status: 200, description: 'Resumo retornado' })
  async getSummary(@Req() req: Request) {
    const sessionId = this.getSessionId(req);
    return this.cartService.getCartSummary(sessionId);
  }
}